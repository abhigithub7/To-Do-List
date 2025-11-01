import React from 'react'
import Todos from './templates/Todos'
import { Route, Routes } from 'react-router-dom'
import Welcome from './templates/Welcome'
import Signup from './templates/Signup'
import Login from './templates/Login'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
   <>
   <Routes  >
    <Route path='/welcome'   element={<Welcome/>}  />
    <Route path='/todos' element={<Todos/>}     />
    <Route path='/signup' element={<Signup/>}     />
    <Route path='/' element={<Login/>}     />
   </Routes>
    <Toaster />
   
   </>
  )
}

export default App
