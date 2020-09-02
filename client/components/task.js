import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Task = (props) => {

  const [isNew, setIsNew] = useState(false)
  const [isInProgress, setIsInProgress] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [editToSave, setEditToSave] = useState(false)
  const [saveEditTask, setSaveEditTask] = useState(false)

  useEffect(() => {
    if (props.taskStatus === 'new') {
      setIsNew(true)
    } else if (props.taskStatus === 'in progress') {
      setIsInProgress(true)
    } else if (props.taskStatus === 'blocked') {
      setIsBlocked(true)
    } 
  }, [props.taskStatus])

  async function newButtonClick () {
    await axios.patch(
      `/api/v1/tasks/${props.category}/${props.taskId}`, {'status': 'in progress'})
      // .catch(err => console.log(err))
    await props.setReloadTask(!props.reloadTask)
    await setIsNew(false)
  }
  
  async function blockedButtonClick () {
    if (props.taskStatus === 'in progress') {
      await axios.patch(
        `/api/v1/tasks/${props.category}/${props.taskId}`, {'status': 'blocked'})
        // .catch(err => console.log(err))
      await setIsInProgress(false)
    } else if (props.taskStatus === 'blocked') {
      await axios.patch(
        `/api/v1/tasks/${props.category}/${props.taskId}`, {'status': 'in progress'})
        // .catch(err => console.log(err))
      await setIsBlocked(false)
    }
    await props.setReloadTask(!props.reloadTask)
    // await setIsNew(false)
  }

  async function doneButtonClick () {
    await axios.patch(
      `/api/v1/tasks/${props.category}/${props.taskId}`, {'status': 'done'})
      // .catch(err => console.log(err))
    await props.setReloadTask(!props.reloadTask)
    await setIsInProgress(false)
  }

  // setInputValue
  async function editClick () {
    await props.setInputTaskTitle(props.title)
    await setEditToSave(!editToSave)
    console.log('props.title: ', props.title)
  }

  async function saveClick () {
    await axios.patch(
      `/api/v1/tasks/${props.category}/${props.taskId}`, {'title': props.newEditTask})
    await setSaveEditTask(!saveEditTask)
    await props.setReloadTask(!props.reloadTask)
    await setEditToSave(!editToSave)
  }


  console.log(props)
  console.log(isNew)

  return (
    <div className="flex w-full p-2 bg-gray-100">
      <div className="w-4/5 bg-blue-200 px-2 rounded">{props.title}</div>
      <div className="w-1/5 bg-blue-200  mx-2 rounded">{props.taskStatus}</div>
      <div className="flex px-2">
        {!editToSave && <div className="w-auto px-2 flex flex-shrink-0">
          <button type="button" onClick={editClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            edit
          </button>
        </div>}
        {editToSave && <div className="w-auto px-2 flex flex-shrink-0">
          <button type="button" onClick={saveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            save
          </button>
        </div>}
        {isNew && <div className="w-auto px-2 flex flex-shrink-0">
          <button type="button" onClick={newButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            in progress
          </button>
        </div>}
        {(isBlocked || isInProgress) && <div className="w-auto px-2 flex flex-shrink-0">
          <button type="button" onClick={blockedButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            blocked
          </button>
        </div>}
        {isInProgress && <div className="w-auto px-2 flex flex-shrink-0">
          <button type="button" onClick={doneButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            done
          </button>
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
