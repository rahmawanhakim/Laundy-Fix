import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {CgSmartHomeWashMachine} from 'react-icons/cg'
import {FaBars, FaTimes} from 'react-icons/fa'
import {Button2} from './Button'
import './Navbar.css'

import {IconContext} from 'react-icons/lib'


function Navbar() {

const [click, setClick] = useState(false)
const [button, setButton] = useState(true)

const handleClick = () => setClick(!click)

const closeMobileMenu = () => setClick(false)

const showButton = () => {
    if( window.innerWidth <= 960) {
        setButton(false)
    }else {
        setButton(true)
    }
}


useEffect (() => {
    showButton();
}, [] )


window.addEventListener('resize', 
showButton)

    return (
        <>
        
        <IconContext.Provider value={{ color:'#fff' }}>
        <div className='navbar'>
            <div className='navbar-container container'>
                <Link  className="navbar-logo" onClick={closeMobileMenu}>
                    <CgSmartHomeWashMachine className="navbar-icons"/>
                    Wash IT
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                {click ? <FaTimes/> : <FaBars/>}
                </div>
                <ul className={click? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to="/" className='nav-0' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/service" className='nav-0' onClick={closeMobileMenu}>
                            Service
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/price" className='nav-0' onClick={closeMobileMenu}>
                            Price
                        </Link>
                    </li>
                    <li className='nav-btn'>
                        {button ? (
                            <Link to="/sign-in" className='btn-0' >
                                <Button2 buttonStyle='btn--outline'>SIGN UP</Button2>
                            </Link>
                        ) : (
                            <Link to="/sign-in" className="btn-0" onClick={closeMobileMenu}>
                                <Button2 className="bt" buttonStyle="btn--outline" buttonSize="btn--mobile">SIGN UP</Button2>
                            </Link>
                        )}    
                    </li>
                </ul>
            </div>   
        </div>
        </IconContext.Provider>
        
        </>
    )
}

export default Navbar
