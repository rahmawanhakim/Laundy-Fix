import './App.css';
import React from "react"
//import react router dom
import {Route, Switch} from "react-router-dom"
//importp pages
import LoginAdmin from './pages/Login/loginAdmin';
import HomeAdmin from './pages/admin/homeAdmin';
import LoginKasir from './pages/Login/loginKasir';
import HomeKasir from './pages/kasir/homeKasir';
import LoginOwner from './pages/Login/loginOwner';
import HomeOwner from './pages/owner/homeOwner';
import MemberAdmin from './pages/admin/memberAdmin';
import UserAdmin from './pages/admin/userAdmin';
import OutletAdmin from './pages/admin/outletAdmin';
import PaketAdmin from './pages/admin/paketAdmin';
import TransaksiAdmin from './pages/admin/transaksiAdmin';
import MemberKasir from './pages/kasir/memberKasir';
import PaketKasir from './pages/kasir/paketKasir';
import TransaksiKasir from './pages/kasir/transaksiKasir';
import MemberOwner from './pages/owner/memberOwner';
import UserOwner from './pages/owner/userOwner';
import PaketOwner from './pages/owner/paketOwner';
import OutletOwner from './pages/owner/outletOwner';
import TransaksiOwner from './pages/owner/transaksiOwner';
import LaporanAdmin from './pages/admin/laporanAdmin';
import NewTransaksiAdmin from './pages/admin/newTransaksiAdmin';
import LaporanKasir from './pages/kasir/laporanKasir';
import NewTransaksiKasir from './pages/kasir/newTransaksiKasir';
import Home from './component/pages/HomePage/Home';

class App extends React.Component{
  render(){
    return (
      <Switch>

        <Route path = "/sign-in" component={LoginAdmin}/>
        {/* admin */}
        <Route exact path="/"     component={Home} />
        <Route path="/home-admin" component={HomeAdmin} />
        <Route path="/member-admin" component={MemberAdmin} />
        <Route path="/user-admin" component={UserAdmin} />
        <Route path="/outlet-admin" component={OutletAdmin} />
        <Route path="/paket-admin" component={PaketAdmin} />
        <Route path="/transaksi-admin" component={TransaksiAdmin} />
        <Route path="/newTransaksi-admin" component={NewTransaksiAdmin} />
        <Route path="/laporan-admin" component={LaporanAdmin} />
        {/* kasir */}
        <Route path="/login-kasir" component={LoginKasir} />
        <Route path="/home-kasir" component={HomeKasir} />
        <Route path="/member-kasir" component={MemberKasir} />
        <Route path="/paket-kasir" component={PaketKasir} />
        <Route path="/transaksi-kasir" component={TransaksiKasir} />
        <Route path="/newTransaksi-kasir" component={NewTransaksiKasir} />
        <Route path="/laporan-kasir" component={LaporanKasir} />
        {/* owner */}
        <Route path="/login-owner" component={LoginOwner} />
        <Route path="/home-owner" component={HomeOwner} />
        <Route path="/member-owner" component={MemberOwner} />
        <Route path="/user-owner" component={UserOwner} />
        <Route path="/outlet-owner" component={OutletOwner} />
        <Route path="/paket-owner" component={PaketOwner} />
        <Route path="/transaksi-owner" component={TransaksiOwner} />
      </Switch>  
    );
  }
}

export default App;