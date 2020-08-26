import React, { useState } from 'react'


const AddTask = (props) => {
  const [value, setValue] = useState('')

  async function handleClick () {
    await props.setNewTask(value)
    await setValue('')
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <form className="w-full py-2 px-4">
        <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
          <input 
            value={value}
            className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="New task"
            onChange = {onChange}
          />
          <button type="button" onClick={handleClick} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
            Add task
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask