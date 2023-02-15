import React from "react";
import WebTransaction from "../../web-transaction/web-transaction";
import { useNavigate } from "react-router-dom";
import './admin-home.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
class AdminHomeClass extends React.Component {
    constructor(props){
        super(props);
        this.web = new WebTransaction();
        this.state = {
            token: "",
            history: []
        }
        
    }

    componentDidMount(){

        this.web.getAllHistory(localStorage.getItem("token")).then((data)=>{
            if(data.status === 200){
                
                data.json().then(data => {
                    this.setState({
                        history: data
                    });
                });
            }
            else{
                data.json().then(data => {
                    alert(data.error);    
                });  
            }
        });

        this.setState({
            token: localStorage.getItem("token")
        });
        
    }

    render(){
        if(this.state.token === "null")
        {
            this.props.navigate("/");
        }
        
        return(<section className="admin-container">
            <div className="navbar">
                <button
                    onClick={()=>{this.web.logout(localStorage.getItem("token")); this.props.navigate("/")}}
                    style={{
                    cursor: "pointer",
                    color: "white",
                    backgroundColor: "#e63946",
                    border: "0px",
                    borderRadius: "5px",
                    padding: "15px",
                    margin: "10px",
                    fontSize: "20px",
                    fontWeight: 500,
                    paddingTop: "15px",
                    paddingBottom: "15px"
                }}>Logout</button>
            </div>
            
            <section className="main-container">
            <p>History</p>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="head">Id</TableCell>
                            <TableCell className="head">Email id</TableCell>
                            <TableCell className="head">Geo-Location</TableCell>
                            <TableCell className="head">Login</TableCell>
                            <TableCell className="head">Logout</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.history.map((data)=>{
                            return (<TableRow>
                                <TableCell className="body">{data.id}</TableCell>
                                <TableCell className="body">{data.userId}</TableCell>
                                <TableCell className="body">{data.geoLocation}</TableCell>
                                <TableCell className="body">{data.loginTime}</TableCell>
                                <TableCell className="body">{data.logoutTime}</TableCell>
                            </TableRow>);
                        })}
                        
                    </TableBody>
                </Table>
                </TableContainer>
  


            </section>
            
        </section>)

        // return(<div style={{
        //     display: "flex",
        //     alignItems: "center",
        //     height: "80vh",
        //     justifyContent:"center"
        // }}>
        //     <button
        //         onClick={()=>{this.web.logout(); this.props.navigate("/")}}
        //     style={{
        //         cursor: "pointer",
        //         color: "white",
        //         backgroundColor: "#e63946",
        //         border: "0px",
        //         borderRadius: "5px",
        //         padding: "10px",
        //         margin: "10px",
        //         width: "250px",
        //         fontSize: "20px",
        //         fontWeight: 500,
        //         paddingTop: "15px",
        //         paddingBottom: "15px"
        //     }}>Logout</button>
        // </div>);
    }
    
}

export default function AdminHome(props){
    const navigate = useNavigate();
    
    return(<AdminHomeClass navigate={navigate}></AdminHomeClass>);
}