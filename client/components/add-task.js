import React from 'react'


const AddTask = (props) => {

  async function handleClick () {
    await props.setNewTask(props.inputTaskTitle)
    await props.setInputTaskTitle('')
  }

  const onChange = (e) => {
    props.setInputTaskTitle(e.target.value)
    // props.setNewEditTask(e.target.value)
    console.log('add-task.inputTaskTitle: ', props.inputTaskTitle)
  }


  return (
    <div>
      <form className="w-full py-2 px-4">
        <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
          <input 
            value={props.inputTaskTitle}
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