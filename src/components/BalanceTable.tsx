import React from 'react'

interface BalanceTableProps{
    address:string,
    solanaBalance:string,
    dsBalance:string
}
interface BalanceTablePropsArray{
    props:BalanceTableProps[]
}

function BalanceTable(props:BalanceTablePropsArray) {
  return (
    <div className="w-[100vw] flex justify-center my-6">
        <div >
            <table className="w-full table border-spacing-32 w-[400px]">
                <thead>
                    <tr>
                    <th>Address</th>
                    <th>$SOL</th>
                    <th>$DS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.props ?

                        props.props.map((prop,index)=>{
                            return (
                                <tr key={index}>
                                        <td>{prop.address}</td>
                                        <td>{prop.solanaBalance}</td>
                                        <td>{prop.dsBalance}</td>
                                </tr>
                            )
                        })
                        :
                        (null)
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default BalanceTable
