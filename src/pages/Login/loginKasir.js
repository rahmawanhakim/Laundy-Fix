import React from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';
import './Login.css'
import {MdOutlineEmail} from 'react-icons/md'
import {BsFillKeyFill} from 'react-icons/bs'


export default class LoginKasir extends React.Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            role: "kasir",
            massage: "",
            logged: true
        }
    }
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password,
            role : this.state.role
        }

        let url = "http://localhost:4040/api/user/auth"

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged){
                let kasir = response.data.data
                let token = response.data.token
                localStorage.setItem("kasir", JSON.stringify(kasir))
                localStorage.setItem("token", token)
                this.props.history.push("/home-kasir")
            }else{
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <div className="form">  
        
                <div className='container'>
                    <div className='form-2'>
                    <h1 className='title'>LOGIN KASIR</h1>
                    {!this.state.logged?
                    (
                        <div className='alert alert-danger mt-1' >
                        {this.state.message}
                        </div>

                    ): null }

                    <form onSubmit={ev => this.Login(ev)}>
                    <div className='label'> 
                        <MdOutlineEmail className='FaUser'/>
                        <h2 className='I2'>Insert Username </h2>
                    </div>
                    <input type="text" value={this.state.username} onChange={ev => this.setState({username : ev.target.value})} name="email" className="input1"/>
    
                    <div className='label2'>
                        <BsFillKeyFill className='FaKey'/>
                        <h2 className='I1'>Insert Password</h2>
                    </div>
                    <input  type="password" className='input2' value={this.state.password} onChange={ev => this.setState({password: ev.target.value})}/>
                    <br/>
                    <br/>
                    
                    <button type="submit" className="sign1" >Sign-In</button>
                
                    </form>
                    <br/>
                    <p className='i'>Anda Bukan Kasir ?</p>
                    
                    <p className='o'>Pilih Login Sebagai</p>
                    
                    <Link to ="/" className='sign2'>ADMIN</Link>
                    <Link to ="/login-owner" className='sign3'>OWNER</Link>
                </div>
                
                </div>
            </div>
        )
    }
}