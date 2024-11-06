import React, { useState, useEffect } from 'react'
import { storeLogout } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        authService.logout().then(()=>(dispatch(storeLogout()), console.log('user logged out'),navigate('/')))
    },[])
}

export default Logout