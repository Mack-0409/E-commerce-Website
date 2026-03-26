import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Add from './pages/Add'
import List from './pages/List'
import Booking from './pages/Booking'

const App = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Add />} />
        <Route path='/list' element={<List />} />
        <Route path='/booking' element={<Booking/>} />
      </Routes> 
    </ThemeProvider>
  )
}

export default App
