import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
     <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Navbar />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default App
