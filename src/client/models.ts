import { Coin } from "@cosmjs/stargate";

type TMixNode = {
    /// Network address of this mixnode, for example 1.1.1.1:1234 or foo.mixnode.com
    host: string,

    mix_port: number,

    verloc_port: number,

    http_api_port: number,

    /// Base58-encoded x25519 public key used for sphinx key derivation.
    sphinx_key: string,

    /// Base58-encoded ed25519 EdDSA public key.
    identity_key: string,

    version: string,
};

type MixNodeCostParams = {
    profit_margin_percent: string,

    /// Operating cost of the associated mixnode per the entire interval.
    interval_operating_cost: Coin,
}

export const ourNode: TMixNode = {
    host: '176.58.101.81',
    mix_port: 1789,
    verloc_port: 1790,
    http_api_port: 8000,
    sphinx_key: 'CLkYqVLi6987eGb2c3EXDz5qARWXStQBYiVWrYxarRyG',
    identity_key: '5xVVqHaXD3RbjSKyMmJzpDsmJQCpD5t8jLRgyVGDKP7D',
    version: '1.0.2'
}

export const mixNodeCostParams: MixNodeCostParams = {
    profit_margin_percent: "0.5",
    interval_operating_cost: { denom: 'unym', amount: '5000' }
}

export const ownerSignature: string = '44ukRFkmMK1cxp8rD36HwpVPzZP4FcLx43ksf5ntXAqawEm3xzTNUXrFm8rLggsEbGysyPmW4emQ1b3ynhuQGia8'

