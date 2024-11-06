import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { storeLogin, storeLogout } from './store/authSlice'
function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(storeLogin({userData}))
      } else {
        dispatch(storeLogout())
      }
    })
    .finally(() => (setLoading(false), console.log('user logged in')))
  }, [])

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
