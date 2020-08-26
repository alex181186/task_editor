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
  const [statusPost, setStatusPost] = useState('')
  
  async function fetchComment(nTask, naskCategory) {
    // You can await here
    if (nTask) {
      await axios.post(`/api/v1/tasks/${naskCategory}`, {'title': nTask})
        .then(res => console.log(res))
        .catch(err => console.log(err))
      await setStatusPost(nTask)
      }
  }

  async function fetchTasks(naskCategory) {
    const tasksGetting = await axios.get(`/api/v1/tasks/${naskCategory}`)
      .then(({ data }) => data)
    await  setTasks(tasksGetting)
  }

  useEffect( () => {
    fetchComment(newTask, category)
  }, [newTask])
  

  useEffect( () => {
    fetchTasks(category)
  }, [category, statusPost])

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
      </div>
    </div>
  )
}

export default Category
