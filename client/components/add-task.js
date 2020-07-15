import React, { useEffect, useState } from 'react'
import axios from 'axios'  

const AddTask = (props) => {
  const [task, setTask] = useState()
  useEffect( async() => {
    await axios.post('/api/v1/tasks/:category')
  }, [task])
  return (
    <div>
      <form className="w-full py-2 px-4">
        <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
          <input value={task} className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="New task" />
          <button onClick={() => {
            // history.push(`/${userName}`)
            props.setNewTask(e.target.task)


          }} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
            Add task
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask