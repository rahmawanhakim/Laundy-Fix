import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import NavbarOwner from "./navbar_owner/NavbarOwner";

export default class MemberOwner extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            members: [],
            action: "",
            isModalOpen: false
        }
    }
    getMember = async () => {
        let url = "http://localhost:4040/api/member"
        await axios.get(url)
        .then(response => { 
            this.setState({members: response.data.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
        console.log(this.state.members)
    }
    componentDidMount = () => {
        this.getMember()
    }
    render() {
        return (
            <div>
            <NavbarOwner/>
            <div>
            <Container className="my-4">
                
                    <Card.Body className="card-body">
                        <h2 className="user-title">
                            LIST OF MEMBER
                        </h2>
                        
                        <br />
                        

                        <ul>
                        {this.state.members.map(member => (
                            <li className="list">
                                <div className="mem row">
                                    <div className="col-lg-3 col-md-5 col-sm-4">
                                        <h1 className="beb text">Nama :</h1>
                                        <h6 className="isi2">{member.nama}</h6>
                                    </div>
                                    <div className="col-lg-3 col-md-7 col-sm-8">
                                    <h1 className="beb text">Alamat :</h1>
                                    <h6 className="isi2">{member.alamat}</h6>
                                    </div>
                                    <div className="col-lg-3 col-md-5 col-sm-4">
                                    <h1 className="beb text">Jenis kelamin :</h1>
                                    <h6 className="isi2">{member.jenis_kelamin}</h6>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-4">
                                    <h1 className="beb text">Telepon :</h1>
                                    <h6 className="isi2">{member.tlp}</h6>
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
