import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import NavbarKasir from "./navbar-kasir/NavbarKasir";
import './Kasir.css'
export default class MemberKasir extends React.Component {
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
    handleAdd = () =>{
        this.setState({
            id_member: 0,
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_member: item.id_member,
            nama: item.nama,
            alamat: item.alamat,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        let url = "http://localhost:4040/api/member"
        let form = {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
        
        if(this.state.action === "insert"){
            axios.post(url, form)
            .then(response => { 
                window.alert(response.data.message)
                this.getMember()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_member) => {
        let url = "http://localhost:4040/api/member/" + id_member
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getMember();
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
    render() {
        return (
            <div>
            <NavbarKasir/>
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
        );
    }
}
