import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import NavbarAdmin from "./navbar_admin/NavbarAdmin";
import './User.css'


export default class UserAdmin extends React.Component{
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
    handleAdd = () =>{
        this.setState({
            id_user: 0,
            nama: "",
            username: "",
            password: "",
            role: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_user: item.id_user,
            nama: item.nama,
            username: item.username,
            password: item.password,
            role: item.role,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave =(event)=>{
        event.preventDefault();
        let url = "http://localhost:4040/api/user"
        let form = {
            id_user: this.state.id_user,
            nama: this.state.nama,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }
        if (this.state.action === "insert") {
            axios.post(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_user) => {
        let url = "http://localhost:4040/api/user/" + id_user
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini ?')) {
          axios.delete(url)
          .then(response => {
            this.getUser();
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
    <NavbarAdmin/>
<div>
    
    <Container className="my-4">
        
            <Card.Body className="card-body">
                <h2 className="user-title">
                    LIST OF USER
                </h2>
                
                <br />
                <div >
                    <button className="add" onClick={() => this.handleAdd()}>
                        Add New User
                    </button>
                </div>

                <ul >
                {this.state.users.map(user =>( 
                    <li className="list">
                        <div className="hey row">
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <h1 className="text">Nama User :</h1>
                                <h6 className="isi">{user.nama}</h6>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <h1 className="text">Username :</h1> 
                                <h6 className="isi">{user.username}</h6>
                            </div>
                            <div className="col-lg-4 col-md-3 col-sm-2">
                                <h1 className="text">Role :</h1> 
                                <h6 className="isi">{user.role}</h6>
                            </div>
                            <div className="col-lg-2 col-md-3 ">
                                <button className="edit" onClick={() => this.handleEdit(user)}>
                                    <AiFillEdit className="icon"/>
                                </button>
                                <button className="delete" onClick={() => this.handleDelete(user.id_user)}>
                                    <MdDelete className="icon"/>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            </Card.Body>
       
    </Container>

    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Form New User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSave}>
            <Modal.Body>
                <Form.Group className="mb-2">
                    <Form.Label>Nama User</Form.Label>
                    <Form.Control type="text" value={this.state.nama} 
                    onChange={ev => this.setState({ nama : ev.target.value})} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label> Username </Form.Label>
                    <Form.Control type="text" value={this.state.username}
                    onChange={ev => this.setState({ username : ev.target.value})} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password" value={this.state.password}
                    onChange={ev => this.setState({password: ev.target.value})} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label> Role </Form.Label>
                    <Form.Select value={this.state.role} 
                    onChange={ev => this.setState({role: ev.target.value})}>
                        <option value=""> </option>
                        <option value="admin">Admin</option>
                        <option value="kasir">Kasir</option>
                        <option value="owner">Owner</option>
                    </Form.Select>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
    </div>
</div>
        )     
    }
}

