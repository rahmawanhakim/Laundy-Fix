import React from 'react'
import { Button } from '../Button'
import './Login.css'
import {MdOutlineEmail} from 'react-icons/md'
import {BsFillKeyFill} from 'react-icons/bs'
import Navbar from '../Navbar'
import axios from 'axios'
import { base_url } from '../../../Config'
import { Link } from 'react-router-dom'


  
export default class App extends React.Component {

    constructor (){
        super()
        this.state = {
            email : "",
            password : "",
            message: "",
            logged: true
        }
    }

    Login = event => {
        event.preventDefault() 
        let sendData = {
            email : this.state.email,
            password : this.state.password
        }

        let url = base_url + "/user"

        axios.post(url, sendData)
        .then(res => {
            this.setState({logged: res.data.logged})
            if ( this.state.logged){
                let user = res.data.data
                let token = res.data.token
                localStorage.setItem("user",JSON.stringify(user))
                localStorage.setItem("token", token)
                this.props.history.push('/dashboard-customer')
            }else{
                this.setState({message: res.data.message})
            }
        })

        .catch(err => console.log(err))
    }
    
render(){
        return (
            <div className="form">  
            <Navbar/>
                <div className='container'>
                    <div className='form-2'>
                    <h1>LOGIN</h1>
                
            
                    
                    <div className='label'> 
                        <MdOutlineEmail className='FaUser'/>
                        <h2 className='I2'>Insert Email </h2>
                    </div>
                    <form  onSubmit={event => this.Login(event)}>
                    <input  name="email" className="input1" value={this.state.email} onChange={event => this.setState({email: event.target.value}) } autoComplete='false'/>
    
                    <div className='label2'>
                        <BsFillKeyFill className='FaKey'/>
                        <h2 className='I1'>Insert Password</h2>
                    </div>
                    <input  type="password" className='input2' value={this.state.password} onChange={event => this.setState({password : event.target.value}) } autoComplete='false' />
                    <br/>
                    <br/>
                    <Link to ="/dashboard-customer">
                    <Button className="sign1" type="submit" buttonSize={"btn--medium"} buttonColor={'blue'}>Sign-In</Button>
                    </Link>
                    </form>
                   
                   
                </div>
                
                </div>
            </div>
        
            
        )
    }
}


