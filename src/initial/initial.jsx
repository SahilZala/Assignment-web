import { useState } from "react";
import Login from "../login/login";
import Signup from "../signup/signup";
import WebTransaction from "../web-transaction/web-transaction";
import { useNavigate } from "react-router-dom";

export default function Initial(){

    const[screen,setScreen] = useState(0);
    const web = new WebTransaction();
    const navigate = useNavigate();

    if(localStorage.getItem("token") === "null"){

        if(screen === 0)
        {
            return(
                <Login set={(index)=>setScreen(index)}/>
            );
        }
        else{
            return(
                <Signup set={(index)=>setScreen(index)}/>
            );
        }
    }
    else{
        web.check(localStorage.getItem("token")).then((data)=>{
            if(data.status === 200){
                data.json().then(data => {
                    if(data){
                        if(localStorage.getItem("user") === "ROLE_USER"){
                            navigate("/user");
                        }
                        else{
                            navigate("/admin");
                        }
                    }
                    
                });
            }
            else{
                web.logout(localStorage.getItem("token"));
                if(screen === 0)
                {
                    return(
                        <Login set={(index)=>setScreen(index)}/>
                    );
                }
                else{
                    return(
                        <Signup set={(index)=>setScreen(index)}/>
                    );
                }
            }
        });
    }
    
}