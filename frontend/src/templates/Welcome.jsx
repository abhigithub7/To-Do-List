import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
function Welcome() {

    const navigate = useNavigate()
  return (
    <>
    <Header/>
    <div className='w-full h-[100vh]  bg-black    '>
      
        <div className='items-center justify-center text-center space-y-7 pt-48  md:p-48 p-8 '>
       <h1 className='text-white md:text-5xl text-3xl font-bold text-center'>Welcome To Todo List</h1>
       <p className='text-white md:text-xl text-sm font-semibold '>You can Perform a Crud operations and multple Task and manage your Task</p>
       <button  onClick={()=>navigate('/todos')} className='px-5 py-3 text-white text-lg font-semibold rounded-lg cursor-pointer justify-center items-center text-center bg-green-600' >Get Started</button>
       </div>
    </div>
    </>
  )
}

export default Welcome
