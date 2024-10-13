// import { useWalletClient } from "@thalalabs/surf/hooks";
import { AptosClient } from "aptos";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/use-toast";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { Buffer } from 'buffer';


import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { useEffect } from "react";
import axios from "axios";

export const moduleAddress = "0x75f726b3883c82977b3963497ebb9da973f8d537200bb524115cb43531260f83";
const options = {
    method: 'GET',
    url: `https://api.devnet.aptoslabs.com/v1/accounts/${moduleAddress}/module/Event_Manager`
};
const aptosConfig = new AptosConfig({ network: Network.DEVNET });

export const aptos = new Aptos(aptosConfig);
export default function Tickets() {
    const { account, signAndSubmitTransaction } = useWallet();
    console.log(account);
    const fetchh = async () => {
        try {
            const { data } = await axios.request(options);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    type CreateCollectionArgs = {
        name: string;
        description: string;
        seats: number;
        price: number;
    };

    const viewCollection = async () => {
        console.log(account);
        if (!account) return;

        // console.log(account);
        console.log("hey");

        try {
            const taskResource = await aptos.getAccountResource(
                {
                    accountAddress: account?.address,
                    resourceType: `0x75f726b3883c82977b3963497ebb9da973f8d537200bb524115cb43531260f83::Event_Manager::get_event`
                }
            );
            console.log(taskResource);
            console.log("success");
        } catch (e) {
            console.log(e);
        }
    };
    const createCollection = async ({
        name,
        description,
        seats,
        price,
    }: CreateCollectionArgs): Promise<void> => {
        console.log(account);
        if (!account) return;

        console.log(account);
        console.log("hey");

        try {
            const transaction: InputTransactionData = {
                data: {
                    function: `${moduleAddress}::Event_Manager::create_and_mint_event`,
                    functionArguments: [
                        Buffer.from(name),         // Convert name to buffer
                        Buffer.from(description),  // Convert description to buffer
                        seats,
                        price,
                    ]
                }
            };

            const response = await signAndSubmitTransaction(transaction);
            // wait for transaction
            await aptos.waitForTransaction({ transactionHash: response.hash });
            console.log("success");
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchh();
        // const tempName = "Sample Event";
        // const tempDescription = "This is a sample event description.";
        // const tempSeats = 100;
        // const tempPrice = 50;

        // Call the createCollection function with temporary values
        // createCollection({
        //     name: tempName,
        //     description: tempDescription,
        //     seats: tempSeats,
        //     price: tempPrice,
        // }).then(() => {
        //     console.log("Collection created successfully.");
        // }).catch((error) => {
        //     console.error("Failed to create collection:", error);
        // });
        viewCollection().then(() => {
            console.log("Collection viewed successfully.");
        }).catch((error) => {
            console.error("Failed to view collection:", error);
        });
        
    }, [account])

    return (
        <div>helo</div>
    );
};