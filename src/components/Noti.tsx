import React from 'react'

function Noti() {
  return (
    <div className="flex absolute top-[0]">
        <div className="m-auto">
            <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
            <div className="flex flex-row">
                <div className="px-2">
                <button style={{backgroundColor:"black", width:"24px",height:"24px", borderRadius:"20%"}}>
                    x
                </button>
                </div>
                <div className="ml-2 mr-6">
                <span className="font-semibold text-rose-700	">Invalid address</span>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Noti



