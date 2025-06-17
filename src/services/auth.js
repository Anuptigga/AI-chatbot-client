import axios from "./axios";
//Login
export const login= async(email,password)=>{
    try {
        const response = await axios.post("/auth/login",{email,password})
        const {token, user}= response.data
        localStorage.setItem("token",token)
        return response.data;
    } catch (error) {
        console.error("Login failed",error.response?.data||error.message)
        throw error;
    }
}

//SignUp
export const signUp=async(name,email,password)=>{
    if(!name||!email||!password){
        throw new Error("All fields required")
    }
    try {
        const response = await axios.post("/auth/signup",{name,email,password})
        const{ token, user} =response.data
        localStorage.setItem('token',token)
        return response.data
    } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        throw error;
    }
}