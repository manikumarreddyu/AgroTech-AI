import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-screen bg-[#f7f7f8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      {/* navbar------------------------ */}
      <nav className='navbar p-2 px-8 w-full h-16 flex items-center bg-[#f7f7f8b8] fixed top-0 z-10'>
        <div className='flex align-center items-center justify-start gap-2 w-1/3'>
          <img src="../src/assets/Logo2.png" alt="" className='rounded-full ' width={"50px"} />
          <h2 className='text-2xl text-zinc-800 font-bold'>AgroRent</h2>
        </div>
        <div className='flex items-end justify-center gap-4 w-1/3'>
          <h1 className='hover:bg-[#b2d8b4] p-1 rounded-md'><Link to="/contact">Contact us</Link></h1>
          <h1 className='hover:bg-[#b2d8b4] p-1 rounded-md'><Link to="/about">About us</Link></h1>
        </div>
        <div className='flex items-end justify-end w-1/3'>
          <button className="bg-[#b2d8b4] hover:bg-[#9fd39b] text-black font-bold py-2 px-4 rounded"><Link to="/login">Login</Link></button>
        </div>
      </nav>

      {/* Video Section------------------ */}

      <div style={{ marginTop: '64px' }}>
        <video src="../src/assets/agrotech.mp4" autoPlay loop muted style={{ width: '100%', height: '80vh', objectFit: 'cover' }} />
      </div>

      {/* Hero Section------------------ */}
      <div className='w-full  h-screen bg-[#f7f7f8] flex   items-center'>
        <div className='w-1/2 px-2  ml-20 items-center justify-center'>
          <h1 className='text-9xl text-[#2a7f62] text-bold mb-3'>AgroRent</h1>
          <h2 className='text-3xl text-[#41676a]'>Your Partner in Prosperous Farming</h2>
          <h2 className='text-xl text-zinc-600 mt-4'>AgroRent is dedicated to supporting farmers on their path to bountiful harvests. We provide easy access to essential tools through our rental platform, enhancing productivity and profitability. Together, let's cultivate a future where sustainable farming flourishes, creating a legacy of growth and prosperity for all farmers.</h2>
          <button className="bg-[#2a7f62] hover:bg-[#2f6b57] text-white font-bold py-2 px-4 mt-11 rounded"><Link to="/register">Get Started</Link></button>
          </div>
        <div className='w-1/2  ml-60'>
          <img src="../src/assets/hero.png" alt="" style={{ right: '0px' }} />
        </div>
      </div>

    {/* How it Works section------------------------ */}


    {/*  Statistics Section----------- */}


    {/* Our Customers section------------------------   */}

    {/* Footer ------------*/}
    <Footer/>

    </div>
  )
}

export default Home
