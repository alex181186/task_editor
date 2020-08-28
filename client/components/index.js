import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const IndexComponent = () => {
  const [categories, setCategories] = useState([])

  useEffect( () => {
    async function fetchMyCategories() {
      await axios.get('/api/v1/categories').then(({ data }) => setCategories(data))
    }
    fetchMyCategories()
  }, [])

  return (
    <div className="category-info">
      <div>Categories list</div>
      <div>
        {categories.map( (category) => {
          return (
            <div key={category}>
              <Link to={category}>{category}</Link>
            </div>)
        })}
      </div>
    </div>
  )
}

export default IndexComponent