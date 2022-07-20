import React from 'react';
import { Modal, Button, Card, Container, Form } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import NavbarKasir from './navbar-kasir/NavbarKasir';

export default class PaketKasir extends React.Component{
    constructor(){
        super()
        this.state = {
            id_paket: "",
            jenis: "",
            harga: "",
            pakets: [],
            action: "",
            isModalOpen: false
        }
    }
    getPaket = () => {
        let url = "http://localhost:4040/api/paket"
        axios.get(url)
        .then(response => {
            this.setState({pakets: response.data.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.pakets)
    }
    componentDidMount = () =>{
        this.getPaket()
    }
    render(){
        return(
            <div>
            <NavbarKasir/>
        <div>
            
            <Container className="my-4">
                
                    <Card.Body className="card-body">
                        <h2 className="user-title">
                            LIST OF PAKET
                        </h2>
                        
                        <br />
                        <div >
                           
                        </div>

                        <ul >
                        {this.state.pakets.map(paket =>( 
                            <li className="list">
                                <div className=" mem row">
                                    <div className="col-lg-3 col-md-3 col-sm-3">
                                        <h1 className="beb text">Jenis Paket:</h1>
                                        <h6 className="isi2">{paket.jenis}</h6>
                                    </div>
                                    <div className="col-lg-5 col-md-3 col-sm-3">
                                        <h1 className="beb text">Harga :</h1> 
                                        <h6 className="isi2">{paket.harga}</h6>
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