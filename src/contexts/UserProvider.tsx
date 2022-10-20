import { useWallet,useAnchorWallet,useConnection, } from '@solana/wallet-adapter-react';
import React,{createContext,useContext, useEffect,useState} from 'react';
import * as anchor from '@project-serum/anchor' 
import {PublicKey,SystemProgram} from '@solana/web3.js'



const BlogContext = createContext({});

export const useUser = () => {
    const context = useContext(BlogContext);
    if(!context) {
        throw new Error("Parent should suck a cock")
    }
    return context;
}


function UserProvider({children}:any) {
    const [res,setRes] = useState(null)
    let wallet = useWallet();
    useEffect(()=>{ 
        const user = {
            name:"cocksucker",
            avatar:"https://i.pravatar.cc/300",
            wallet
        }
        console.log("wallet changed: ",wallet)
        console.log("wallet from my cock: ",wallet.publicKey)
        setRes({user})
    },[])
  return (
    <BlogContext.Provider
        value={
            {res}
        }
    >
        {children}
    </BlogContext.Provider>
  )
}

export default UserProvider