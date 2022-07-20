import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import NavbarOwner from "./navbar_owner/NavbarOwner";


export default class UserOwner extends React.Component{
    constructor(){
        super()
        this.state = {
            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            users: [],
            action: "",
            isModalOpen: false
        }
    }
    getUser = () => {
        let url = "http://localhost:4040/api/user"
        axios.get(url)
        .then(response => {
            this.setState({users: response.data.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.users)
    }
    componentDidMount = () =>{
        this.getUser()
    }
    render(){
        return(
    <div>
    <NavbarOwner/>
<div>
    
    <Container className="my-4">
        
            <Card.Body className="card-body">
                <h2 className="user-title">
                    LIST OF USER
                </h2>
                
                <br />
               

                <ul >
                {this.state.users.map(user =>( 
                    <li className="list">
                        <div className="mem row">
                            <div className="col-lg-4 col-md-3 col-sm-3">
                                <h1 className="beb text">Nama User :</h1>
                                <h6 className="isi2">{user.nama}</h6>
                            </div>
                            <div className="col-lg-4 col-md-3 col-sm-3">
                                <h1 className="beb text">Username :</h1> 
                                <h6 className="isi2">{user.username}</h6>
                            </div>
                            <div className="col-lg-4 col-md-3 col-sm-2">
                                <h1 className="beb text">Role :</h1> 
                                <h6 className="isi2">{user.role}</h6>
                            </div>
                            
                        </div>
                    </li>
                ))}
                </ul>
            </Card.Body>
       
    </Container>
    </div>
            </div>
        )     
    }
}

