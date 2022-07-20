import React from 'react';import HeroSection from '../HeroSection'
import Navbar from '../Navbar'
import{homeObjOne, homeObjTwo, homeObjThree} from './Data'

function Service() {
    return (
        <>
            <Navbar/>
            
            <HeroSection exact {...homeObjTwo} />
            <HeroSection {...homeObjOne}/>
            <HeroSection {...homeObjThree}/>
            
        </>
    )
}

export default Service;
