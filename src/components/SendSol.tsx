import React, { useEffect, useState } from 'react'
import * as solanaWeb3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import {TOKEN_PROGRAM_ID} from "@solana/spl-token"
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider';
import Noti from './Noti';
import TransactionNotification from './TransactionNotification';



function SendSol({childToParrent}) {

    const { networkConfiguration} = useNetworkConfiguration();

    const [address,setaddress] = useState("");
    const [error,setError] = useState(null)
    const [amount,setAmount] = useState("")
    const [receiverWalletInfo,setReceiverWalletInfo] = useState({
        address:null,
        solanaBalance:null,
        dsBalance:null
    })
    const [senderWalletInfo,setSenderWalletInfo] = useState({
        address:null,
        solanaBalance:null,
        dsBalance:null
    })
    const [pushedSender,setPushedSender] = useState(false)
    const [pushedReceiver,setPushedReceiver] = useState(false)
    const [transactionLink,setTransactionLink] = useState(null) 
    const [hash,setHash] = useState(null)

    const wallet = useWallet();

    const {connection} = useConnection();



    // console.log("wallllletttt: ",wallet.publicKey.toString())

    const handleClick = async () => {
        if(address && !amount){
            try{
                const newPub = new solanaWeb3.PublicKey(address);
                setError(false)

            }catch(err){
                setError(true)
            }
        }
        else if(address && amount) {
            try{
                const newPub = new solanaWeb3.PublicKey(address)
                // console.log("newPub: ",newPub.toBase58())
                const sB = await connection.getBalance(new solanaWeb3.PublicKey(address))/solanaWeb3.LAMPORTS_PER_SOL;
                const mintAcc = new solanaWeb3.PublicKey("MZenLrfXd2ukAktceeUeH539NyRXg2AWgn6SfbErozZ")
                const tA = await connection.getTokenAccountsByOwner(newPub,{mint:mintAcc})
                try{
                    const info = await connection.getTokenAccountBalance(tA.value[0].pubkey)
                    setReceiverWalletInfo({
                        address:newPub.toString(),
                        solanaBalance:sB,
                        dsBalance:info.value.uiAmount
                    })
                }catch(err){
                    setReceiverWalletInfo({
                    address:newPub.toString(),
                    solanaBalance:sB,
                    dsBalance:null
                })
                }
                setError(false)
                const transaction = new solanaWeb3.Transaction().add(
                    solanaWeb3.SystemProgram.transfer({
                        fromPubkey:wallet.publicKey,
                        toPubkey:newPub,
                        lamports:solanaWeb3.LAMPORTS_PER_SOL*parseFloat(amount)
                    })
                )
                const signature = await wallet.sendTransaction(transaction,connection);
                const validation = await connection.confirmTransaction(signature,"processed")
                setHash(signature)
                setTransactionLink(`https://explorer.solana.com/tx/${signature}?cluster=${networkConfiguration}`)
            }catch(er){
                console.log("er: ",er)
                setError(true)
            }
            // console.log(parseFloat(amount))
        }
    }
    // console.log("networkConfiguration: ",networkConfiguration)

    useEffect(()=>{
        if(receiverWalletInfo.address && !pushedReceiver){
            const childToParrentPush = {...receiverWalletInfo}
            childToParrentPush['receiver'] = true;
            childToParrentPush['sender'] = false;
            childToParrent(childToParrentPush)
            console.log("receiverWalletInfo: ",childToParrentPush)
            setPushedReceiver(true)
        }
    },[receiverWalletInfo])

    useEffect(()=>{
        if(senderWalletInfo.address && !pushedSender){
            const childToParrentPush = {...senderWalletInfo};
            childToParrentPush['receiver'] = false;
            childToParrentPush['sender'] = true;
            childToParrent(childToParrentPush)
            console.log("senderWalletInfo: ",childToParrentPush)
            setPushedSender(true)
        }        
    },[senderWalletInfo])

    useEffect(()=>{
        if(wallet){
            if(wallet.publicKey){
                const newPub = wallet.publicKey;
                // console.log("newPub: ",newPub)
                const getSolanaBalance = async() =>{
                    const sB = await connection.getBalance(newPub)/solanaWeb3.LAMPORTS_PER_SOL;
                    // console.log("sbbbbb",sB)
                    const mintAcc = new solanaWeb3.PublicKey("MZenLrfXd2ukAktceeUeH539NyRXg2AWgn6SfbErozZ")
                    const tA = await connection.getTokenAccountsByOwner(newPub,{mint:mintAcc})
                    try{
                        const info = await connection.getTokenAccountBalance(tA.value[0].pubkey)
                        setSenderWalletInfo({
                        address:newPub.toString(),
                        solanaBalance:sB,
                        dsBalance:info.value.uiAmount
                    })
                    }catch(err){
                        setSenderWalletInfo({
                        address:newPub.toString(),
                        solanaBalance:sB,
                        dsBalance:null
                    })
                    }
                    
                }
                getSolanaBalance()
            }
        }
        // console.log("senderWalletInfo",senderWalletInfo)
    },[wallet])

  return (
    <>
    {error ? (<Noti/>) : null }
    {transactionLink ? (<TransactionNotification transactionLink={transactionLink} hash={hash}/>) : (null)} 
        <div className='w-[300px] flex-column gap-y-12 h-[25vh]'>
            <div>
                <input type="text" value={address} onChange={(e)=>setaddress(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-6" placeholder="address" required />
            </div>
            <div>
                <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-6" placeholder="amount" required />
            </div>
            <div className="flex space-x-2 justify-center">
                <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={handleClick}
                >send</button>
            </div>
        </div>
    </>
  )
}

export default SendSol
