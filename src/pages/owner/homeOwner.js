import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom'
import NavbarOwner from './navbar_owner/NavbarOwner';


export default class HomeOwner extends React.Component{
    constructor(){
        super()
        this.state = {
            userName: "",
            countMember: "",
            countUser: "",
            countPaket: "",
            countTransaksi: "",
            token: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getUsername = () => {
        let user = JSON.parse(localStorage.getItem('owner'))
        this.setState({userName: user.nama})
    }
    getMember = () => {
        let url = "http://localhost:4040/api/member"
        axios.get(url)
        .then(response => {
          this.setState({countMember: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getUser = () => {
        let url = "http://localhost:4040/api/user"
        axios.get(url)
        .then(response => {
          this.setState({countUser: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getPaket = () => {
        let url = "http://localhost:4040/api/paket"
        axios.get(url)
        .then(response => {
          this.setState({countPaket: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getTransaksi = () => {
        let url = "http://localhost:4040/api/transaksi"
        axios.get(url)
        .then(response => {
          this.setState({countTransaksi: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentDidMount = () => {
        this.getMember()
        this.getUser()
        this.getPaket()
        this.getTransaksi()
        this.getUsername()
    }
    render(){
        return(
    <div >
    <NavbarOwner/>
          
    
    <div>
      <h1 className='username'>WELCOME BACK  {this.state.userName}</h1>
      <h1 className='dash'>DASHBOARD</h1>
     
      <div className='hero'>
        <button className="button-ts">
        <h1 className='ts'>TRANSAKSI COUNT</h1>
        <Link to="/transaksi-owner">
      <button className="button-tsn">{this.state.countTransaksi}</button>
        </Link>
      </button>

      <button className="button-ts2">
        <h1 className='ts2'>USER COUNT</h1>
        <Link to="/user-owner">
      <button className="button-tsn2">{this.state.countUser}</button>
        </Link>
      </button>

      <button className="button-ts3">
        <h1 className='ts3'>OUTLET COUNT</h1>
        <Link to="/outlet-owner">
      <button className="button-tsn3" >{this.state.countOutlet}</button>
        </Link>
      </button>

      <button className="button-ts4">
        <h1 className='ts4'>MEMBER COUNT</h1>
        <Link to="/member-owner">
      <button className="button-tsn4" >{this.state.countMember}</button>
        </Link>
      </button>

      

      
      </div>
      
      
    </div>
    <br/>
    <br/>
</div>
        )     
    }
}

