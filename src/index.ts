import { useOptions, getContractVersion, getStateParams, bondMixNode, unbondMixnode } from "./client/client";
import { qwertyOptions } from "./client/networks/qwerty";

async function main() {
    console.log('Hello world!')

    // Create or load account
    const [address, client] = await useOptions(qwertyOptions).setup("password", ".new.key");

    console.log("mnemonic: ", await useOptions(qwertyOptions).recoverMnemonic("password", ".new.key"));

    // Display the wallet address
    let account = await client.getAccount(address)
    console.log("Our address is: " + address);

    // Check the wallet balance
    let balance = await client.getBalance(address, "unym");
    console.log(`The balance of ${address} is ` + balance.amount + balance.denom);


    console.log(await getContractVersion(client))
    console.log('stateParams', await getStateParams(client))
    // console.log('bonde mix node', await bondMixNode(client, address))
    console.log('unbond', await unbondMixnode(client, address));
}


main();



