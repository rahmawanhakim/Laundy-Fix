import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import {Link} from 'react-router-dom'
import NavbarKasir from "./navbar-kasir/NavbarKasir";

export default class TransaksiKasir extends React.Component {
    constructor() {
        super()
        this.state = {
            token:"",
            id_transaksi: "",
            id_member: "",
            id_paket:"",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"",
            dibayar:"",
            id_user:"",
            idUser:"",
            namaUser:"",
            id_outlet:"",
            qty:0,
            outlet: "",
            users:[],
            user:[],
            paket:[],
            transaksi: [],
            member: [],
            outlets:[],
            nama: "",
            action: "",
            isModalOpen: false
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization : `Bearer ${this.state.token}` }
        }
        return header
    }
    getTransaksiIdOutlet = () => {
        // console.log(this.state.outlet)
        if(this.state.outlet !== null && this.state.outlet !== undefined && this.state.outlet !== ""){
            console.log('get transaksi by id')
            let url = "http://localhost:4040/api/transaksi/outlet/" + this.state.outlet
            // console.log(url)
            axios.get(url)
            .then(response => {
                let dataTransaksi = response.data.data
                // console.log(response);
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty
                        total += (harga * qty)
                    }
                    //tambahkan key "total"
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksi: dataTransaksi })
            })
            .catch(error => console.log(error))
        // console.log(this.state.outlets)
        }else{
            console.log('get transaksi')
            let url = "http://localhost:4040/api/transaksi/"
            axios.get(url)
            .then(response => {
                let dataTransaksi = response.data.data
                console.log(response)
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty
                        total += (harga * qty)
                    }
                    //tambahkan key "total"
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksi: dataTransaksi })
            })
            .catch(error => console.log(error))
        }  
    }
    getUser = async () => {
        let url = "http://localhost:4040/api/user"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({user: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.user)
    }
    getMember = async () => {
        let url = "http://localhost:4040/api/member"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({member: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.member)
    }
    getPaket = async () => {
        let url = "http://localhost:4040/api/paket"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({paket: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.paket)
    }
    getOutlet = async () => {
        let url = "http://localhost:4040/api/outlet"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({outlets: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.outlet)
    }
    
    getUsers = () => {
        let kasir = JSON.parse(localStorage.getItem('kasir'))
        this.setState({id_user: kasir.id_user})
    }
    componentDidMount = () => {
        this.getTransaksiIdOutlet()
        this.getMember()
        this.getUsers()
        this.getPaket()
        this.getUser()
        this.getOutlet()
    }
    handleAdd = () =>{
        this.setState({
            id_transaksi: 0,
            id_member: "",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"baru",
            dibayar:"",
            id_user: this.state.id_user,
            id_outlet:"",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_transaksi: item.id_transaksi,
            id_member: item.id_member,
            tgl: item.tgl,
            batas_waktu: item.batas_waktu,
            tgl_bayar: item.tgl_bayar,
            status: item.status,
            dibayar: item.dibayar,
            id_user: item.id_user,
            id_outlet: item.id_outlet,
            action: "update",
            isModalOpen1: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        let url = "http://localhost:4040/api/transaksi"
        let form = {
                id_transaksi: this.state.id_transaksi,
                id_member: this.state.id_member,
                tgl: this.state.tgl,
                batas_waktu: this.state.batas_waktu,
                tgl_bayar: this.state.tgl_bayar,
                status: this.state.status,
                dibayar: this.state.dibayar,
                id_user: this.state.id_user,
                id_outlet: this.state.id_outlet
            }
        
        if(this.state.action === "insert"){
            axios.post(url, form,this.headerConfig())
            .then(response => { 
                window.alert("success")
                this.getTransaksiIdOutlet()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form,this.headerConfig())
            .then(response => {
                window.alert(response.data)
                this.getTransaksiIdOutlet()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_transaksi) => {
        let url = "http://localhost:4040/api/transaksi/" + id_transaksi
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url,this.headerConfig())
          .then(response => {
            this.getTransaksiIdOutlet();
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false,
            isModalOpen1: false
        })
    }
    GantiStatus(status) {
        if (status === 'baru') {
            return (
                <div className="badge bg-info">
                    New
                <br />
                </div>
            )
        } else if (status === 'proses') {
            return (
                <div className="badge bg-warning">
                    Processed
                    <br />
                </div>
            )
        } else if (status === 'selesai') {
            return (
                <div className="badge bg-success">
                    Finished
                    <br />
                </div>
            )
        } else if (status === 'diambil') {
            return (
                <div className="badge bg-secondary">
                    Taken
                </div>
            )
        }
    }
    GantiStatusBayar(id_transaksi, dibayar) {
        if (dibayar === 'belum_dibayar') {
            return (
                <div className="badge bg-danger text-white">
                    Not Yet Paid
                </div>
            )
        } else if (dibayar === 'dibayar') {
            return (
                <div className="badge bg-success text-white">
                    Paid
                </div>
            )
        }
    }
    render() {
        return (
            <div>
            <NavbarKasir />
           
                
                    
                        <h2 className="title8">
                            LIST TRANSAKSI
                        </h2>
                        <br />
                        <div >
                        <Link to="/newTransaksi-admin">
                            <button className="add2" >
                                New Transaksi
                            </button>
                            </Link>
                            <Link to="/laporan-admin">
                            <button className="print" >
                                to Report Page
                            </button></Link>
                        </div>
                        <div >
                            <Form.Select className="search" id= "mySelect" onChange={ev => this.setState({outlet: ev.target.value})} onClick={this.getTransaksiIdOutlet}>
                                <option value="">Pilih Outlet</option>
                            {this.state.outlets.map(outlet => (
                                <option value={outlet.id_outlet}>{outlet.lokasi}</option>
                            ))}
                            </Form.Select>
                        </div>
                        <ul>
                        {this.state.transaksi.map(transaksi => (
                            <li className="list2">
                                <div className="transaksi row">
                                    <div className="col-lg-3">
                                        <h1 className="atas text">Member Name :</h1>
                                        <h6 className="detail">{transaksi.member.nama}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <h1 className="atas text">Date :</h1>
                                        <h6 className="detail">{moment(transaksi.tgl).format('DD-MM-YYYY')}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <h1 className="atas text">Payment Date :</h1> 
                                        <h6 className="detail">{moment(transaksi.tgl_bayar).format('DD-MM-YYYY')}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <h1 className="atas text">Deadline :</h1> 
                                        <h6 className="detail">{moment(transaksi.batas_waktu).format('DD-MM-YYYY')}</h6>
                                    </div>
                                    
                                    <div className="col-lg-3">
                                        <h1 className="atas text">Outlet Location:</h1> 
                                        <h6 className="detail">{transaksi.outlet.lokasi}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <h1 className="atas text">Status :</h1> 
                                        <h6 >{this.GantiStatus(transaksi.status)}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <h1 className="atas text">Payment :</h1> 
                                        <h6 >{this.GantiStatusBayar(transaksi.id_transaksi, transaksi.dibayar)}
                                        </h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <h1 className="atas text">Total :</h1> 
                                        <h6 className="detail">Rp. {transaksi.total}</h6>
                                    </div> 
                                    <div className="col-lg-3">
                                        <h1 className="atas text">User :</h1> 
                                        <h6 className="detail">{transaksi.user.nama}</h6>
                                    </div>                                       
                                    
                                    <hr />
                                    <div className="col-lg-9">
                                        <h1 className="title7">
                                            Detail Transaksi
                                        </h1> 
                                        <br />
                                        {transaksi.detail_transaksi.map(detail => (
                                            <strong className="Dtransaksi row">
                                                {/** area nama paket col-3 */}
                                                <div className="col-lg-3">
                                                   <h6 className="Dpaket"> {detail.paket.jenis}</h6>
                                                </div>
                                                {/** area qty col-2 */}
                                                <div className="col-lg-3">
                                                <h6 className="Dpaket">  qty: {detail.qty}</h6>
                                                </div>
                                                {/** area harga paket col-3 */}
                                                <div className="col-lg-3">
                                                <h6 className="Dpaket">  1/  Rp {detail.paket.harga}</h6>
                                                </div>
                                                {/** area total paket col-lg 4 */}
                                                <div className="col-lg-3">
                                                <h6 className="Dpaket">  Rp {detail.paket.harga * detail.qty}</h6>
                                                </div>
                                            </strong>
                                        ))}
                                    </div>
                                    <div className="col-lg-3 ">
                                        <button className="btn-edit" onClick={() => this.handleEdit(transaksi)}>
                                            <AiFillEdit className="icon"/>
                                        </button>
                                        <button className="btn-delete" onClick={() => this.handleDelete(transaksi.id_transaksi)}>
                                            <ImCross className="icon"/>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        
                        </ul>
            </div>
        );
    }
}