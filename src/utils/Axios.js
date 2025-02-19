import axios from "axios";

const axiosInstance = axios.create({timeout:5000});

axiosInstance.interceptors.request.use(req=>{
    req.customData = req.customData||{};
    req.customData.startTime=new Date().getTime();
    return req;
})

axiosInstance.interceptors.response.use(res=>{
    res.customData = res.customData||{};
    res.customData.time=new Date().getTime()-res.config.customData.startTime;
    return res;
},err=>{
    if(err.response){
        err.response.customData = err.response.customData||{};
        err.response.customData.time=new Date().getTime()-err.response.config.customData.startTime;
        return err.response;
    }
    else if(err.request){
        alert("No response receieved.")
    }
})

export default axiosInstance;