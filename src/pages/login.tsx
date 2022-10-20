import { RequestAirdrop } from 'components/RequestAirdrop'
import React, { useState } from 'react'
import {auth} from '../firebase'

function login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("username: ",username," password: ",password)
    }

  return (
    <div><div className="md:hero mx-auto p-4">
        <div className="md:hero-content flex flex-col">
              

          <h1>poutsa</h1>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center basis-5/6 gap-y-4'>
                <div>
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">username</label>
                    <input type="text" onChange={e=>setUsername(e.target.value)} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">password</label>
                    <input type="password" onChange={e=>setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                </div>
                <div>
                    <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">login</button>
                </div>
            </div>
          </form>
          
            <div className="text-center">
          </div>
          {/* address={["sd","ds"]} dsBalance={["32","23"]} solBalance={["44","55"]} */}
        </div>
      </div></div>
  )
}

export default login