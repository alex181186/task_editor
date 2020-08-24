import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './category.scss'
import Task from './task'
import AddTask from './add-task'

const Category = () => {
  const { category } = useParams()
  // const [tasksTitle, setTasksTitle] = useState([])
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  // get data from api


  useEffect( async() => {
    console.log('newTask: ', newTask)
    const status = await axios.post(`/api/v1/tasks/${category}`, {'title': newTask})
    console.log('status: ', status)
  }, [newTask, category])


  useEffect( async() => {
    const tasksGetting = await axios.get(`/api/v1/tasks/${category}`)
      .then(({ data }) => data)
    /*
    const tasksTitleArr = tasks.reduce((acc, rec) => {
      return [...acc, rec.title]
    }, [])
    setTasksTitle(tasksTitleArr)
    */
    setTasks(tasksGetting)
    console.log('tasks: ', tasks)
  }, [category])
  // console.log('tasksTitle: ', tasksTitle)
  return (
    <div className="category">
      <div className="content">
        <div className="flex mb-4">
          <div className="flex-1 bg-gray-500 h-12">
            <div className="content__category-name text-center text-xl">Task category: {category}</div>
          </div>
        </div>

        <AddTask setNewTask={setNewTask} category={category}/>

        <div className="task-info">
          {tasks.map( task => {
            return <Task key={task.taskId} title={task.title} taskId={task.taskId} />
          })}
          

        </div>
        <div>{newTask}</div>
      </div>
    </div>
  )
}

// <div>{tasks}</div>
export default Category
