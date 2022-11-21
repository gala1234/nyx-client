import { GasPrice, makeCosmoshubPath } from "@cosmjs/stargate";
import path from "path";
import { Options } from "../client";
import process from "os";


export const uniOptions: Options = {
    httpUrl: 'https://rpc.uni.juno.deuslabs.fi',
    networkId: 'uni',
    bech32prefix: 'juno',
    feeToken: 'ujunox',
    faucetUrl: 'https://faucet.uni.juno.deuslabs.fi/credit',
    hdPath: makeCosmoshubPath(0),
    defaultKeyFile: path.join(process.homedir(), ".uni.key"),
    fees: {
        upload: 6000000,
        init: 500000,
        exec: 200000,
    },
    gasPrice: GasPrice.fromString("0.025ujunox"),
}