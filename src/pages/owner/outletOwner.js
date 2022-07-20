import React from 'react';
import axios from "axios";
import {  Card, Container} from 'react-bootstrap';

import NavbarOwner from './navbar_owner/NavbarOwner';


export default class OutletOwner extends React.Component{
    constructor(){
        super()
        this.state = {
            id_outlet: "",
            lokasi: "",
            outlets: [],
            action: "",
            isModalOpen: false
        }
    }
    getOutlet = () => {
        let url = "http://localhost:4040/api/outlet"
        axios.get(url)
        .then(response => {
            this.setState({outlets: response.data.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.outlets)
    }
    componentDidMount = () =>{
        this.getOutlet()
    }
    handleAdd = () => {
        this.setState({
            id_outlet: "",
            lokasi: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) => {
        this.setState({
            id_outlet: item.id_outlet,
            lokasi: item.lokasi,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) => {
        event.preventDefault();
        let url = "http://localhost:4040/api/outlet"
        let form = {
            id_outlet: this.state.id_outlet,
            lokasi: this.state.lokasi
        }
        if (this.state.action === "insert") {
            axios.post(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getOutlet()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getOutlet()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        }
    }
    handleDelete = (id_outlet) => {
        let url = "http://localhost:4040/api/outlet/" + id_outlet
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getOutlet();
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    render(){
        return(
            <div>
            <NavbarOwner/>
        <div>
            
            <Container className="my-4">
                
                    <Card.Body className="card-body">
                        <h2 className="user-title">
                            LIST OF OUTLET
                        </h2>
                        
                        <br />
                        <div >
                           
                        </div>

                        <ul >
                        {this.state.outlets.map(outlet =>( 
                            <li className="list">
                                <div className="mem row">
                                    <div className="col-lg-10 col-md-2 col-sm-4">
                                        <h1 className="beb text">Lokasi Outlet :</h1>
                                        <h6 className="isi2">{outlet.lokasi}</h6>
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