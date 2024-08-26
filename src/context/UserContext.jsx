import { createContext, useEffect, useState } from "react";

    export let Usercontext = createContext()
    export default function Usercontextprovider({children}){
        
        let [usertoken,setusertoken]=useState(null)

        useEffect(()=>{
            if(localStorage.getItem("usertoken")!==null){
                setusertoken(localStorage.getItem("usertoken"))
            }
        },[])


        return <Usercontext.Provider value={{usertoken , setusertoken}}>
            {children}
        </Usercontext.Provider>
    }
    