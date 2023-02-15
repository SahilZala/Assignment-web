import React from "react";
import './signup.css';
import WebTransaction from "../web-transaction/web-transaction";
export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.web = new WebTransaction();
        this.state = { 
            username: "",
            password: "",
            email: ""
        }
    }
    render(){
        return(
            <div className="signup-container">
                <div>
                    <p>Singup form</p>
                    <div className="inline">
                        <label>Name</label>
                        <input type="text" onChange={(res)=>this.setState({username: res.target.value})} placeholder="ex: Jhone Doe"></input>
                    </div>
                    <div className="inline">
                        <label>Email id</label>
                        
                        <input type="email" onChange={(res)=>this.setState({email: res.target.value})} placeholder="abc@gmail.com"></input>
                    </div>
                    <div className="inline">
                        <label>Password</label>
                        
                        <input type="password" onChange={(res)=>this.setState({password: res.target.value})} placeholder="xxxxxx"></input>
                    </div>
                    <button onClick={()=>this.createAccount()}>Create account</button>
                    <p style={{
                        textAlign: 'center'
                    }}>or</p>
                    <p className="signup" onClick={()=>this.props.set(0)}>login</p>
                </div>
            </div>);
    }   

    createAccount()
    {
        this.web.createAccount(this.state.username,this.state.password,this.state.email);
    }
    
}