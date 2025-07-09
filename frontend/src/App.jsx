import React from 'react'
import Todos from './templates/Todos'
import { Route, Routes } from 'react-router-dom'
import Welcome from './templates/Welcome'
function App() {
  return (
   <>
   <Routes  >
    <Route path='/'   element={<Welcome/>}  />
    <Route path='/todos' element={<Todos/>}     />
   </Routes>
   </>
  )
}

export default App
