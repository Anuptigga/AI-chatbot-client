import axios from "./axios";

export const getStats= async()=>{
    const res= await axios.get("/admin/stats",{withCredentials:true});
    return res.data;
}