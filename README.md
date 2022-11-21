Nyx Client (Demo)
=================

A simple client demo for connecting to CosmWasm blockchains.

Setup:

```
npm install
```

Running (dev mode):

```
npm run start:dev
```



Let's stash some wallet info that we can use to connect:

```
- name: wallet
  type: local
  address: wasm18l7gn64dkg5py5y70fg0uhz4jjstuy3nwc73dz
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A3/Z9Y4lPiBvMD9wmP0SN0dLY9qm/1xGcc/pZ0OCJKkt"}'
  mnemonic: ""


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

peace laundry youth mushroom present dinosaur valid project all catalog love enhance tribe gloom lunar file inform spray behave city cigar eight pledge version
dave@fatmac wasmd %
wasmd keys add wallet2

- name: wallet2
  type: local
  address: wasm1wudaedv7vmfz86twjjuz2j0da6gn2luv8rx394
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AqixblyX+KHsIyOmwCF8uJC1pZBeHBGR6oM+ZaOthsyq"}'
  mnemonic: ""


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

else mad cannon insane whisper squirrel dash disorder gesture mention bomb pioneer purchase profit aunt media gravity family bicycle test pizza room mule upgrade


Contract address:
wasm1v8krvc76z2k4gy34ugvd8vu84klss4tkkuhvd07cxuktaa5qrafsyh6gjw



export CHAIN_ID="malaga-420"
export TESTNET_NAME="malaga-420"
export FEE_DENOM="umlg"
export STAKE_DENOM="uand"
export BECH32_HRP="wasm"
export WASMD_VERSION="v0.27.0"
export CONFIG_DIR=".wasmd"
export BINARY="wasmd"

export COSMJS_VERSION="v0.28.1"
export GENESIS_URL="https://raw.githubusercontent.com/CosmWasm/testnets/master/malaga-420/config/genesis.json"

export RPC="https://rpc.malaga-420.cosmwasm.com:443"
export API="https://api.malaga-420.cosmwasm.com"
export FAUCET="https://faucet.malaga-420.cosmwasm.com"

export NODE=(--node $RPC)
export TXFLAG=($NODE --chain-id $CHAIN_ID --gas-prices 0.25umlg --gas auto --gas-adjustment 1.3)
```