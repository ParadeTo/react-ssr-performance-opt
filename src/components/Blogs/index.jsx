import {useEffect, useState} from 'react'
import './style.css'

export const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then(setBlogs)
  }, [])

  return (
    <ul className='blogs'>
      {blogs.map(({name, description}, index) => {
        return (
          <li key={index}>
            <p>{name}</p>
            <p>{description}</p>
          </li>
        )
      })}
    </ul>
  )
}
