import React from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/Landing'
import Marquee from '../components/marquee'
import About from '../components/about'
import Eyes from '../components/eyes'
import GoTo from '../components/GoTo'
import LocomotiveScroll from 'locomotive-scroll';


function Home() {
    const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className='w-full h-screen text-white'>
      <Navbar/>
      <Landing/>
      <Marquee/>
      <About/>
      <Eyes/>
      <GoTo/>
    </div>
  )
}

export default Home
