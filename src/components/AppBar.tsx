import { FC, useEffect, useState } from 'react';
import Link from "next/link";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import { newLogo } from 'assets';
import Image from "next/image"
import { useUser } from 'contexts/UserProvider';

export const AppBar: FC = props => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [avatar,setAvatar] = useState(null)
  const [name,setName] = useState(null)
  let user = useUser()
  // console.log("user from my cock: ",user)
  // useEffect(()=>{
  //   user = useUser()
  //   console.log("user from my cock: ",user)
  // },[user])

  useEffect(()=>{
    if(user){
      console.log("user found")
      console.log("user from useEffect: ",user)

      if(user){
        if((user as any).res){
          if((user as any).res.user.avatar && (user as any).res.user.name){
            setAvatar((user as any).res.user.avatar)
            setName((user as any).res.user.name)
            console.log("EXISTSSSS")
          }
        }
      }
    }
  },[user])

  return (
    <div>

      {/* NavBar / Header */}
      <div className="navbar flex flex-row md:mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="navbar-start">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">

            <svg className="inline-block w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        
          <div className="hidden sm:inline w-22 h-22 md:p-2">

            <Image src={newLogo} alt="bank" width={"120px"} height="80px" className='w-[180px] h-[120px]' />
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:inline md:navbar-center">
          <div className="flex items-stretch">
            <Link href="/">
              <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
            </Link>
            <Link href="/basics">
              <a className="btn btn-ghost btn-sm rounded-btn">Basics</a>
            </Link>
          </div>
        </div>

        {/* Wallet & Settings */}
        <div className="navbar-end">
          {(name && avatar) ? (  <><img src={avatar} alt="" className="w-[40px] h-[40px] rounded-xl" />
          <a className="btn btn-ghost btn-sm rounded-btn">{name}</a> </>) : (null)  }
          <WalletMultiButton className="btn btn-ghost mr-4" />

          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-square btn-ghost text-right">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:w-52">
              <li>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <a>Autoconnect</a>
                    <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} className="toggle" />
                  </label>

                  <NetworkSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};
