import React, { useState } from 'react'
import prettyBytes from 'pretty-bytes';
import { JsonEditor } from "json-edit-react";


function Response(props) {
    const {responseData} = props;
    const [tab,setTab] = useState("Body");
    
  return (
    <div className='mt-4'>
      <h2 className='font-semibold text-xl'>Response:</h2>

      <div className='flex gap-4'>
        <span>Status: {responseData.status}</span>
        <span>Time: {responseData?.customData?.time}ms</span>
        <span>Size: {prettyBytes(JSON.stringify(responseData?.data).length+JSON.stringify(responseData?.headers).length)}</span>
      </div>

      <div className='mt-2 flex gap-6 font-semibold text-lg'>
        <button onClick={()=>setTab('Body')} className={`${tab=="Body"?'text-blue-600':null} cursor-pointer`}>Body</button>
        <button onClick={()=>setTab('Headers')} className={`${tab=="Headers"?'text-blue-600':null} cursor-pointer`}>Headers</button>
      </div>

      {tab==='Body' && 
        <div className='mt-2 bg-secondary max-h-60 overflow-auto'>
            <JsonEditor data={responseData.data}/>
        </div>
      }

      {tab==='Headers' && 
        <div className='mt-2 bg-secondary p-4 text-md space-y-1'>
            {Object.entries(responseData?.headers).map(([key,val])=>(
                <div key={key}><strong>{key}</strong> : {val}</div>
            ))}
        </div>
      }

    </div>
  )
}

export default Response
