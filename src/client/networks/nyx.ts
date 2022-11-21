import { GasPrice, makeCosmoshubPath } from "@cosmjs/stargate";
import path from "path";
import process from "os";
import { Options } from "../client";

export const nyxOptions: Options = {
    httpUrl: 'https://rpc.nymtech.net',
    networkId: 'nyx',
    bech32prefix: 'n',
    feeToken: 'nym',
    faucetUrl: '',
    hdPath: makeCosmoshubPath(0),
    defaultKeyFile: path.join(process.homedir(), ".nyx.key"),
    fees: {
        upload: 2500000,
        init: 1000000,
        exec: 500000,
    },
    gasPrice: GasPrice.fromString("0.25unym"),
}