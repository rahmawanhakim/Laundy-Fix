import React from 'react'
import HeroSection2 from '../HeroSection2'
import HeroSection from '../HeroSection'
import Navbar from '../Navbar'
import{homeObjOne, homeObjTwo, homeObjThree} from './Data'

function Home() {
    return (
        <div>
            <Navbar/>
            <HeroSection {...homeObjOne}/>
            <HeroSection2 {...homeObjTwo} />
            <HeroSection {...homeObjThree}/>
        </div>
    )
}

export default Home
