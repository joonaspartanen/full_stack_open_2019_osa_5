import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks'

const AddBlogForm = ({ blogs, setBlogs, setNotification }) => {

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? 'none' : '',
    marginBottom: 18
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const formStyle = {
    marginLeft: .5 + 'em',
    marginBottom: 1 + 'em'
  }

  const addBlog = async event => {
    event.preventDefault()
    toggleVisibility()

    try {
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value
      }

      const data = await blogService.create(blogObject)
      setBlogs(blogs.concat(data))
      title.reset()
      author.reset()
      url.reset()

      setNotification({ message: `The blog ${title.value} by ${author.value} was added to the list` })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)

    } catch (exception) {
      setNotification({ message: 'Adding blog failed', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    }
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>Add blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Add new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">Title:</label>
            <input {...title} style={formStyle} />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input {...author} style={formStyle} />
          </div>
          <div>
            <label htmlFor="url">URL:</label>
            <input {...url} style={formStyle} />
          </div>
          <button type="submit">Add blog</button>
          <button onClick={toggleVisibility} style={{ marginLeft: 10 }}>Cancel</button>
        </form>
      </div>
    </>
  )
}

export default AddBlogForm