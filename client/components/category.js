import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Category = () => {
  const { category } = useParams()
  const [tasks, setTasks] = useState()
  // get data from api
  useEffect(() => {
    axios.get(`/api/v1/tasks/$(category)`).then(({ data }) => {setTasks(data)})
    return () => {}
  }, [category])

  return (
    <div>
      <div>{category}</div>
      <div>{tasks}</div>
    </div>
  )
}

export default Category
