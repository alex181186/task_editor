import React from 'react'
import axios from 'axios'

const TimeChoiceMenu = (props) => {

  /*
  async function allTimeButtonClick () {
    await axios.patch(
      `/api/v1/tasks/${props.category}/${props.taskId}`, {'status': 'done'})
      // .catch(err => console.log(err))
    await props.setReloadTask(!props.reloadTask)
    await setIsInProgress(false)
  }
*/
/*
async function timeButtonClick (timespan) {
  const tasksGetting = await axios.get(`/api/v1/tasks/${props.category}/${timespan}`)
    .then(({ data }) => data)
  console.log('tasksGetting: ', tasksGetting)
    // .catch(err => console.log(err))
  // await props.setReloadTask(!props.reloadTask)
  // await props.setTasks(tasksGetting)
}
*/


async function monthButtonClick () {
  const tasksGetting = await axios.get(`/api/v1/tasks/${props.category}/month`)
    .then(({ data }) => data)
  await props.setTasks(tasksGetting)
}

async function weekButtonClick () {
  const tasksGetting = await axios.get(`/api/v1/tasks/${props.category}/week`)
    .then(({ data }) => data)
  await props.setTasks(tasksGetting)
}

async function dayButtonClick () {
  const tasksGetting = await axios.get(`/api/v1/tasks/${props.category}/day`)
    .then(({ data }) => data)
  await props.setTasks(tasksGetting)
}

async function allTimeButtonClick () {
  const tasksGetting = await axios.get(`/api/v1/tasks/${props.category}`)
    .then(({ data }) => data)
  await props.setTasks(tasksGetting)
}

  return (
    <div className="flex flex-wrap">
      <div className="w-1/3" />
      <div className="flex w-1/3 p-2">
        <button type="button" onClick={allTimeButtonClick} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-4 rounded">
            All time
        </button>
        <button type="button" onClick={monthButtonClick} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-4 rounded">
            Month
        </button>
        <button type="button" onClick={weekButtonClick} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-4 rounded">
            Week
        </button>
        <button type="button" onClick={dayButtonClick} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-4 rounded">
            Day
        </button>
      </div>
      <div className="w-1/3" />
    </div>

  )

}

export default TimeChoiceMenu