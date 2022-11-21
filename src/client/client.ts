import axios from "axios";
import fs from "fs";
import { ExecuteResult, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet, makeCosmoshubPath } from "@cosmjs/proto-signing";
import { HdPath } from "@cosmjs/crypto";
import { mixNodeCostParams, ourNode, ownerSignature } from "./models";

/*
 * This base-helper is here to use with different helper files in contracts
 *
 * Usage: npx @cosmjs/cli@^0.28.1 --init https://raw.githubusercontent.com/InterWasm/cw-plus-helpers/main/base.ts
 *
 * Create a client:
 *   const [addr, client] = await useOptions(malagaOptions).setup('password');
 *
 * Get the mnemonic:
 *   await useOptions(malagaOptions).recoverMnemonic(password);
 *
 * If you want to use this code inside an app, you will need several imports from https://github.com/CosmWasm/cosmjs
*/

export interface Options {
    readonly httpUrl: string
    readonly networkId: string
    readonly feeToken: string
    readonly bech32prefix: string
    readonly hdPath: HdPath
    readonly faucetUrl?: string
    readonly defaultKeyFile: string,
    readonly fees: {
        upload: number,
        init: number,
        exec: number
    },
    readonly gasPrice: GasPrice,
}





export interface Network {
    setup: (password: string, filename?: string) => Promise<[string, SigningCosmWasmClient]>
    recoverMnemonic: (password: string, filename?: string) => Promise<string>
}

export const getContractVersion = async (client: SigningCosmWasmClient): Promise<String> => {
    return await client.queryContractSmart('n14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sjyvg3g', { 'get_contract_version': {} })
}

export const getStateParams = async (client: SigningCosmWasmClient): Promise<String> => {
    return await client.queryContractSmart('n14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sjyvg3g', { 'get_state_params': {} })
}

export const bondMixNode = async (client: SigningCosmWasmClient, address: string): Promise<ExecuteResult> => {
    const msg = {
        'bond_mixnode': {
            mix_node: ourNode,
            cost_params: mixNodeCostParams,
            owner_signature: ownerSignature
        }
    }
    return await client.execute(address, 'n14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sjyvg3g', msg, 100000, "let's bond a mixnode", [{ amount: "100000000", denom: "unym" }])
}

export const unbondMixnode = async (client: SigningCosmWasmClient, address: string): Promise<ExecuteResult> => {
    const msg = {
        'unbond_mixnode': {}
    }
    return await client.execute(address, 'n14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sjyvg3g', msg, 100000)
}

export const useOptions = (options: Options): Network => {

    const loadOrCreateWallet = async (options: Options, filename: string, password: string): Promise<DirectSecp256k1HdWallet> => {
        let encrypted: string;
        try {
            encrypted = fs.readFileSync(filename, 'utf8');
        } catch (err) {
            // generate if no file exists
            const wallet = await DirectSecp256k1HdWallet.generate(12, { hdPaths: [options.hdPath], prefix: options.bech32prefix });
            const encrypted = await wallet.serialize(password);
            fs.writeFileSync(filename, encrypted, 'utf8');
            return wallet;
        }
        // otherwise, decrypt the file (we cannot put deserialize inside try or it will over-write on a bad password)
        const wallet = await DirectSecp256k1HdWallet.deserialize(encrypted, password);
        return wallet;
    };

    const connect = async (
        wallet: DirectSecp256k1HdWallet,
        options: Options
    ): Promise<SigningCosmWasmClient> => {
        const clientOptions = {
            prefix: options.bech32prefix,
            gasPrice: options.gasPrice
        }
        return await SigningCosmWasmClient.connectWithSigner(options.httpUrl, wallet, clientOptions)
    };

    const hitFaucet = async (
        faucetUrl: string,
        address: string,
        denom: string
    ): Promise<void> => {
        await axios.post(faucetUrl, { denom, address });
    }

    const setup = async (password: string, filename?: string): Promise<[string, SigningCosmWasmClient]> => {
        const keyfile = filename || options.defaultKeyFile;
        const wallet = await loadOrCreateWallet(options, keyfile, password);
        const client = await connect(wallet, options);

        const [account] = await wallet.getAccounts();
        // ensure we have some tokens
        if (options.faucetUrl) {
            const tokens = await client.getBalance(account.address, options.feeToken)
            if (tokens.amount === '0') {
                console.log(`Getting ${options.feeToken} from faucet`);
                await hitFaucet(options.faucetUrl, account.address, options.feeToken);
            }
        }

        return [account.address, client];
    }

    const recoverMnemonic = async (password: string, filename?: string): Promise<string> => {
        const keyfile = filename || options.defaultKeyFile;
        const wallet = await loadOrCreateWallet(options, keyfile, password);
        return wallet.mnemonic;
    }

    return { setup, recoverMnemonic };
}