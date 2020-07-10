import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Category = () => {
  const { category } = useParams()
  const [tasksTitle, setTasksTitle] = useState([])
  // get data from api
  useEffect( async() => {
      const tasks = await axios.get(`/api/v1/tasks/${category}`)
        .then(({ data }) => data)
      const tasksTitleArr = tasks.reduce((acc, rec) => {
        return [...acc, rec.title]
      }, [])
      setTasksTitle(tasksTitleArr)
      console.log('tasks: ', tasks)

  }, [category])
  console.log('tasksTitle: ', tasksTitle)
  return (
    <div>
      <div>{category}</div>
      <div>{tasksTitle}</div>
    </div>
  )
}


// <div>{tasks}</div>
export default Category
