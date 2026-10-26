import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import Header from './components/Header'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
    <Header></Header>
    <Outlet></Outlet>
    </>
  )
}

export default App
