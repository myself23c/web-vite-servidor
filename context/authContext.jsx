import { createContext,useState,useContext, useEffect } from "react";
import {registerRequest,loginRequest,verifyTokenRequest} from "../api/auth.js"
import Cookies from "js-cookie"

export const AuthContext = createContext()

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth debe estar en un provider")
    }
    return context
}

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const signup = async (user)=>{
        const res = await registerRequest(user); console.log(res)
        console.log(res.data)
        setUser(res.data)
    }
/*
    const signin = async (user)=>{

        try{
            const res = await loginRequest(user)
            //console.log(res)
            setUser(res.data);
            setIsAuthenticated(true);
            
        }catch(e){
            console.log(e)
        }
        
    }
*/


const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

    return (<AuthContext.Provider value={{
        signup,
        signin,
        loading,
        isAuthenticated,
        user
    }}>
        {children}
    </AuthContext.Provider>)
}