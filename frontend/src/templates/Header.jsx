import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleSubmit = async () =>{
         

      
        try {
            const result = await axios.get('http://127.0.0.1:8000/api/logout/')

            console.log(result.data)
            toast.success("Logout succesfully")
            navigate('/')


            
        } catch (error) {
            console.log(error)
            toast.error("Logout Failed")
            
        }

    }
  return (
    <div className='p-2 shadow-sm flex bg-black justify-between border border-gray-800 items-center px-5 '>
      <img className='h-10 w-12' src='https://cdn.dribbble.com/userupload/16195651/file/original-265a8992b84bf86d903abcd38db04a08.jpg?resize=400x0'/>
      <div>
      <button onClick={handleSubmit} className='bg-red-700 px-5 py-2 cursor-pointer  rounded-md text-white'>Logout</button>

      </div>
    </div>
  )
}

export default Header
