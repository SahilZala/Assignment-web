import React from "react";
import WebTransaction from "../../web-transaction/web-transaction";
import { useNavigate } from "react-router-dom";
class UserHomeClass extends React.Component {

    constructor(props){
        super(props);
        this.web = new WebTransaction();
        this.state = {
            token: ""
        }
        
    }

    componentDidMount(){
        this.setState({
            token: localStorage.getItem("token")
        });
        
    }

    render(){
        if(this.state.token === "null")
        {
            this.props.navigate("/");
        }
        
        return(<div style={{
            display: "flex",
            alignItems: "center",
            height: "80vh",
            justifyContent:"center"
        }}>
            <button
                onClick={()=>{this.web.logout(localStorage.getItem("token")); this.props.navigate("/")}}
            style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "#e63946",
                border: "0px",
                borderRadius: "5px",
                padding: "10px",
                margin: "10px",
                width: "250px",
                fontSize: "20px",
                fontWeight: 500,
                paddingTop: "15px",
                paddingBottom: "15px"
            }}>Logout</button>
        </div>);
    }
}

export default function UserHome(props){
    const navigate = useNavigate();
    
    return(<UserHomeClass navigate={navigate}/>);
}