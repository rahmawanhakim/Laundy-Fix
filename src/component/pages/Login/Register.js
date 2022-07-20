import {useState} from 'react'
import { Button } from '../Button'
import {Link} from 'react-router-dom'
import {AiOutlineUser} from 'react-icons/ai'
import {MdOutlineEmail} from 'react-icons/md'

import {BsFillKeyFill} from 'react-icons/bs'
import {MdOutlineWork} from 'react-icons/md'
import Navbar from '../Navbar'
import Axios from 'axios'


function Register() {

    const [emailReg , setEmailReg] = useState ("")
    const [passwordReg , setPasswordReg] = useState ("")
    const [usernameReg , setUsernameReg]=  useState("")
    const [roleReg , setRoleReg] = useState ("")

    const register = () => {
        Axios.post('http://localhost4040/api/user/',{
            username : usernameReg, 
            email : emailReg, 
            password : passwordReg, 
            role : roleReg
        }).then((response) => {
            console.log(response)
        })
    }
    
    return (
        <div >
            <Navbar/>
        <div className='container'>
            <div className='form-2R'>
            <h1>REGISTER</h1>

            <div className='label3'>
                <AiOutlineUser className='FaReg'/>
                <h2  className='I3'>Insert Username</h2>
            </div>
            <input name="username" className="input1" onChange={(e) => {setUsernameReg(e.target.value)}}/>
            <div className='label4'>
                <MdOutlineEmail className='FaReg'/>
                <h2 className='I3'>Insert Email</h2>
            </div>
            <input  name='email' type="email" className='input2' onChange={(e) => {setEmailReg(e.target.value)}}/>

            <div className='label4'>
                <BsFillKeyFill className='FaReg'/>
                <h2 className='I3'>Create Password</h2>
            </div>
            <input  name='password' type="password" className='input2' onChange={(e) => {setPasswordReg(e.target.value)}}/>
            <div className='label4'>
                <MdOutlineWork className='FaReg'/>
                <h2 className='I3'>Role</h2>
            </div>
            <select name="role" className='input2' onChange={(e) => {setRoleReg(e.target.value)}} >
                <option value="0"> </option>
                <option value="admin">admin</option>
                <option value="kasir">kasir</option>
                <option value="owner">owner</option>
            </select>
            <br/>
            <br/>
            <Button to="/" className="sign-up" buttonSize={"btn--medium"} buttonColor={'blue'} onClick={register} >Sign-Up</Button>
            <p>Sudah Punya Akun?</p>
            <Link to="/sign-in" className='sign2'>Login Disini</Link>
        </div>
        </div>
    </div>
    )
}

export default Register
