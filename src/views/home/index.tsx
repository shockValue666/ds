// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import SendSol from '../../components/SendSol'
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

//solana
import * as solanaWeb3 from '@solana/web3.js';
import BalanceTable from 'components/BalanceTable';


export const HomeView: FC = ({ }) => {


  const wallet = useWallet();
  const { connection } = useConnection();

  const [pub,setPub] = useState(null)
  const [childData,setChildData] = useState([])
  

  const { getUserSOLBalance } = useUserSOLBalanceStore()


  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
      setPub(new solanaWeb3.PublicKey(wallet.publicKey).toString())
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  const childToParent = (cpData) => {
    try{
      setChildData(oldArray=>[...oldArray,cpData])
    }catch(err){
      console.log(err)
    }
    
  }

  useEffect(()=>{
    console.log("childDataaaaaaa: ",childData)
  },[childData])


  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
             

        {/* <h4 className="md:w-full text-center text-slate-300 my-2">
          {pub && (<h1>pubKey: {pub}</h1>)}
          lol
          {pub ? (<h1>{pub}</h1>) : (<h1>null</h1>)}
        </h4> */}
        
          <div className="text-center">
          <RequestAirdrop />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          {/* {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>} */}
        </div>
        {childData.length == 2 || childData.length == 1 ? <BalanceTable props={childData} />: (null)}
         {/* address={["sd","ds"]} dsBalance={["32","23"]} solBalance={["44","55"]} */}
        <SendSol childToParrent={childToParent}/>
      </div>
    </div>
  );
};
