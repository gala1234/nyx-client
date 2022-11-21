import { GasPrice, makeCosmoshubPath } from "@cosmjs/stargate";
import path from "path";
import process from "os";
import { Options } from "../client";

export const qwertyOptions: Options = {
    httpUrl: 'https://qwerty-validator.qa.nymte.ch',
    networkId: 'nymnet',
    bech32prefix: 'n',
    feeToken: 'unym',
    hdPath: makeCosmoshubPath(0),
    defaultKeyFile: path.join(process.homedir(), ".qwerty.key"),
    fees: {
        upload: 2500000,
        init: 1000000,
        exec: 500000,
    },
    gasPrice: GasPrice.fromString("0.25unym"),
}