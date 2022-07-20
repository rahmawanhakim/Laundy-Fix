import React from "react";
import { MdDashboard } from "react-icons/md";
import {MdOutlineRememberMe} from 'react-icons/md'
import {FaUserAlt, FaTshirt} from 'react-icons/fa'
import {VscServerEnvironment} from 'react-icons/vsc'
import {GoLocation} from 'react-icons/go'
import {BiLogOut} from 'react-icons/bi'

        

 export const SidebarData = [


    {
        title: 'Dashboard',
        path: '/home-kasir',
        icon: <MdDashboard/>,
        className: 'nav-text'
    },

   

    {
        title : "Member",
        path : '/member-kasir',
        icon: <MdOutlineRememberMe/>,
        className:'nav-text'
    },

    {
        title : 'Transaksi',
        path : '/transaksi-kasir',
        icon : <VscServerEnvironment/>,
        className : 'nav-text'
    },
    {
        title : 'Paket',
        path : '/paket-kasir',
        icon : <FaTshirt/>,
        className : 'nav-text'
    },
    
    {
        title : 'Logout',
        path : '/',
        icon : <BiLogOut/>,
        className : 'nav-text'
    }


]



