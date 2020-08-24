import React, { useState } from 'react'
// import axios from 'axios'  

const AddTask = (props) => {
  const [value, setValue] = useState('')
  // const [task, setTask] = useState('')
  // let textInput = React.createRef

  /*
  useEffect( async() => {
    await axios.post(`/api/v1/tasks/${props.category}`, {'title': task})
  }, [task])
  */

  const handleClick = async() => {
    // console.log(props.category)
    // await alert(value)
    // if (typeof value !== 'undefined') {
    await props.setNewTask(value)
    // await setTask(value)
    // alert(task)
    // const status  = await axios.post(`/api/v1/tasks/${props.category}`, {'title': value})
    // const status  = await axios.get(`/api/v1/tasks/${props.category}`)
    // alert(status)
    // }
    // const status  = await axios.post(`/api/v1/tasks/${props.category}`, {'title': value})
    // alert(status)
  }

  // console.log(task)

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
          <button onClick={handleClick} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
            Add task
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask