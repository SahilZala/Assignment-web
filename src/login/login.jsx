import React from "react";
import './login.css';
import WebTransaction from "../web-transaction/web-transaction";
import { useNavigate } from "react-router-dom";
class LoginClass extends React.Component{

    constructor(props){
        super(props);
        this.web = new WebTransaction();
        this.state = {
            email: "",
            password: ""
        }
    }
    render(){
        return(
            <div className="login-container">
                <div>
                    <p>Login form</p>
                    <div className="inline">
                        <label>Email id</label>
                        
                        <input type="email" onChange={(res)=>{
                            this.setState({
                                email: res.target.value
                            })
                        }} placeholder="abc@gmail.com"></input>
                    </div>
                    <div className="inline">
                        <label>Password</label>
                        
                        <input onChange={(res)=>{
                            this.setState({
                                password: res.target.value
                            })
                        }} type="password" placeholder="xxxxxx"></input>
                    </div>
                    <button onClick={()=>this.onLogin()}>Login</button>
                    <p style={{
                        textAlign: 'center'
                    }}>or</p>
                    <p className="signup" onClick={()=>this.props.set(1)}>signup ?</p>
                </div>
            </div>
        );
    }

    onLogin(){
        this.web.login(this.state.email,this.state.password).then((data)=>{
            console.log(data);
            if(data.status === 200){
                data.json().then(data => {
                    console.log(data.data);
                      
                    localStorage.setItem("token",data.data.token);
                    localStorage.setItem("user",data.data.user);

                    if(data.data.user === "ROLE_USER"){
                        this.props.navigate("/user");
                    }
                    else{
                        this.props.navigate("/admin");
                    }
                    alert("Login Succssefull");
                });
            }
            else{
                data.json().then(data => {
                    alert("Invalid credentials");    
                });  
            }
        });
    }
}

export default function Login(props){
    const navigate = useNavigate();
    return (<LoginClass navigate = {navigate} set={props.set}></LoginClass>);
}