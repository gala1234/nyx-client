import { GasPrice, makeCosmoshubPath } from "@cosmjs/stargate";
import path from "path";
import process from "os";
import { Options } from "../client";

export const malagaOptions: Options = {
    httpUrl: 'https://rpc.malaga-420.cosmwasm.com',
    networkId: 'malaga-420',
    bech32prefix: 'wasm',
    feeToken: 'umlg',
    faucetUrl: 'https://faucet.malaga-420.cosmwasm.com/credit',
    hdPath: makeCosmoshubPath(0),
    defaultKeyFile: path.join(process.homedir(), ".malaga.key"),
    fees: {
        upload: 2500000,
        init: 1000000,
        exec: 500000,
    },
    gasPrice: GasPrice.fromString("0.25umlg"),
}