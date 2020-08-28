import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Task = (props) => {

  const [isNew, setIsNew] = useState(false)
  const [isInProgress, setIsInProgress] = useState(false)

  useEffect(() => {
    if (props.taskStatus === 'new') {
      setIsNew(true)
    } else if (props.taskStatus === 'in progress') {
      setIsInProgress(true)
    }
  }, [props.taskStatus])

  async function newButtonClick () {
    await axios.patch(
      `/api/v1/tasks/${props.category}/${props.taskId}`, {'status': 'in progress'})
      .catch(err => console.log(err))
    await props.setReloadTask(!props.reloadTask)
    await setIsNew(false)
  }
  

  console.log(props)
  console.log(isNew)

  return (
    <div className="flex w-full p-1 px-2 bg-gray-100">
      <div className="w-full bg-blue-200 py-2 px-4 rounded">{props.title}</div>
      <div className="flex">
        {isNew && <div className="w-auto px-2 flex flex-shrink-0">
          <button type="button" onClick={newButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            in progress
          </button>
        </div>}
        {isInProgress && <div className="flex">
          <div className="w-auto px-2 flex flex-shrink-0">
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
              blocked
            </button>
          </div>
          <div className="w-auto px-2 flex flex-shrink-0">
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
              done
            </button>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Task

/*
<div className="content-border flex flex-wrap grid-flow-col">
      <div className="flex gap-4" />
      <div className="flex-1 bg-gray-300 flex-col">
          <div className="task__text content-start text-left bg-gray-400 flex-auto">{props.title}</div>
          <div className="task__button text-center bg-gray-500 flex-auto">Button1</div>
          <div className="task__button content-end text-center bg-gray-600 flex-auto">Button2</div>
      </div>
      <div className="flex gap-4" />
    </div>


<div className="content-border>
      <div>{props.title}</div>
      <div>
        <button type="button">
          Button1
        </button>
      </div>
      <div>
        <button type="button">
          Button2
        </button>
      </div>
    </div>
*/
