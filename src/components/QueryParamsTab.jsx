import React, { useState } from 'react'

function QueryParamsTab(props) {
    const {tab,keyValuePairs,setKeyValuePairs}= props;
    
    const removeKeyValuePair = (i)=>{
        setKeyValuePairs(p=>p.filter((ele,ind)=>ind!==i));
    }
    const writeInKey = (e,i)=>{
        setKeyValuePairs(p => 
            p.map((ele, ind) => 
                ind === i ? { ...ele, key: e.target.value } : ele
            )
        )
    }
    const writeinValue = (e,i)=>{
        setKeyValuePairs(p => 
            p.map((ele, ind) => 
                ind === i ? { ...ele, value: e.target.value } : ele
            )
        )
    }

  return (
    <div className={`${tab==='Query Params'?'block':'hidden'} mt-2 py-2 space-y-4`}>
        {keyValuePairs.map((ele,ind)=>(
            <div key={ind} className='flex gap-2'>
                <input type="text" placeholder='key' className='px-2 py-2 border w-full' onChange={(e)=>writeInKey(e,ind)} value={keyValuePairs[ind].key}/>
                <input type="text" placeholder='value' className='px-2 py-2 border w-full' onChange={(e)=>writeinValue(e,ind)} value={keyValuePairs[ind].value}/>
                <button className='bg-red-500 hover:bg-red-600 font-semibold cursor-pointer text-white px-4' onClick={()=>removeKeyValuePair(ind)}>Remove</button>
            </div>
        ))}

        <button onClick={()=>setKeyValuePairs(p=>[...p,{key:"",value:""}])} className='bg-green-500 hover:bg-green-600 font-semibold cursor-pointer text-white px-8 py-2'>Add</button>
    </div>
  )
}

export default QueryParamsTab
