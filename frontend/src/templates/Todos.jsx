import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Todos() {
  const [task, setTask] = useState([])
  const [inputValue, setInputValue] = useState("")

  const addTask = async (e) => {
    e.preventDefault()
    try {
      if (inputValue.trim() !== '') {
        const response = await axios.post('http://localhost:8000/api/todos/add', {
          tittle: inputValue,
          completed: false
        })
        setTask([...task, response.data])
        setInputValue('')
      }
    } catch (error) {
      console.log("Add Error:", error)
    }
  }

  const toggleCompleted = async (taskId, e) => {
    e.preventDefault()
    try {
      const taskToUpdate = task.find(t => t.id === taskId)
      if (!taskToUpdate) return

      const response = await axios.put(`http://localhost:8000/api/todos/${taskId}/update`, {
        tittle: taskToUpdate.tittle, // required if your backend needs it
        completed: !taskToUpdate.completed
      })

      const updatedTask = task.map(t =>
        t.id === taskId ? { ...t, completed: response.data.completed } : t
      )
      setTask(updatedTask)
      console.log(response.data)
    } catch (error) {
      console.log("Toggle Error:", error)
    }
  }

  const fetchTask = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todos/')
      setTask(response.data)
      console.log(response.data)
    } catch (error) {
      console.log("Fetch Error:", error)
    }
  }


  const deleteTask = async (taskId,) => {
    try {
       await axios.delete(`http://localhost:8000/api/todos/${taskId}/delete`)
      const updatedTask = task.filter(task=>task.id !== taskId)
      setTask(updatedTask)
      
    } catch (error) {
      console.log( error)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])

  return (
    <div className="bg-[#000000] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          <form onSubmit={addTask} className="flex">
            <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-3"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-5 py-1 bg-green-600 text-white shrink-0">
              Add
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-y-3">
          {task.map((task) => (
            <div
              key={task.id}
              
              className={`flex justify-between items-center   border border-black/10 rounded-lg px-3 py-3 gap-x-3 shadow-sm shadow-white/50 duration-300 ${
                task.completed ? "bg-green-700/40 scale-105" : "bg-white/10"
              }`}
            >
              <span onClick={(e) => toggleCompleted(task.id, e)} className='cursor-pointer '>{task.completed ? <del className=''>{task.tittle}</del> : task.tittle}</span>
             
              <span className="text-sm text-gray-400 cursor-pointer">
                {task.completed ? "✔️ Done" : "⏳ Pending"}
                 <span onClick={(e)=>deleteTask(task.id,e)} className='ml-4 p-1 bg-gray-300 rounded-md'>🗑</span>
              </span>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Todos
