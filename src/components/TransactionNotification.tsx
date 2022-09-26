import React from 'react'

function TransactionNotification({transactionLink,hash}) {
  return (
    // <div className="flex absolute top-[0]">
    //     <div className="m-auto">
    //         <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
    //         <div className="flex flex-row">
    //             <div className="px-2">
    //             <button style={{backgroundColor:"black", width:"24px",height:"24px", borderRadius:"20%"}}>
    //                 x
    //             </button>
    //             </div>
    //             <div className="ml-2 mr-6">
    //             <span className="font-semibold text-rose-700	"><a href={transactionLink} target="_blank">{hash}</a></span>
    //             </div>
    //         </div>
    //         </div>
    //     </div>
    // </div>
    <div className="alert alert-success shadow-lg flex absolute top-[70px]">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <a href={transactionLink} target="_blank">{hash}</a>
        </div>
    </div>
  )
}

export default TransactionNotification








