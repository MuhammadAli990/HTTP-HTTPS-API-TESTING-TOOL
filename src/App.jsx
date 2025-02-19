import React, { useState } from 'react'
import QueryParamsTab from './components/QueryParamsTab';
import HeadersTab from './components/HeadersTab';
import JSONTab from './components/JSONTab';
import { convertArrayToObj } from './utils/Conversions';
import Response from './components/Response';
import axiosInstance from './utils/Axios';


function App() {
  const [tab,setTab] = useState("Query Params");
  const [params,setParams] = useState([]);
  const [headers,setHeaders] = useState([]);
  const [jsonData,setJsonData] = useState({});
  const [responseData,setResponseData] = useState(null);

  const handleSend = async(e)=>{
    e.preventDefault();
    const url = e.target.elements.url.value;
    const method = e.target.elements.request_method.value;
    try{
      const result = await axiosInstance({url,method,params:convertArrayToObj(params),headers:convertArrayToObj(headers),data:jsonData})
      setResponseData(result);
    }
    catch(e){
      setResponseData(e.response);
    }
  }

  return (
    <div className='w-screen h-screen p-6 max-w-[1000px] mx-auto'>

      <form onSubmit={handleSend} className='flex md:flex-row flex-col gap-3'>
        <input id='url' required type="url" placeholder='i.e. https://example.com' className='sp-shd-input border-2 px-2 font-semibold w-full py-2 outline-none'/>
        <select id='request_method' className='sp-shd-btn border-2 font-semibold outline-none px-1 py-2'>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
        <button className='sp-shd-btn border-2 px-8 font-semibold py-2'>Send</button>
      </form>

      <div className='mt-6 flex gap-6 font-semibold text-lg'>
        <button onClick={()=>setTab('Query Params')} className={`${tab=="Query Params"?'text-blue-600':null} cursor-pointer`}>Query Params</button>
        <button onClick={()=>setTab('Headers')} className={`${tab=="Headers"?'text-blue-600':null} cursor-pointer`}>Headers</button>
        <button onClick={()=>setTab('JSON')} className={`${tab=="JSON"?'text-blue-600':null} cursor-pointer`}>JSON</button>
      </div>

      <QueryParamsTab tab={tab} keyValuePairs={params} setKeyValuePairs={setParams}/>
      <HeadersTab tab={tab} keyValuePairs={headers} setKeyValuePairs={setHeaders}/>
      <JSONTab tab={tab} jsonData={jsonData} setJsonData={setJsonData}/>

      {responseData && <Response responseData={responseData}/>}

    </div>
  )
}

export default App
