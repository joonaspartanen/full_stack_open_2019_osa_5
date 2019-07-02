import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({ blogs, setBlogs, setNotification, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async event => {
    event.preventDefault()
    toggleVisibility()

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      const data = await blogService.create(blogObject)
      setBlogs(blogs.concat(data))
      setTitle('')
      setAuthor('')
      setUrl('')

      setNotification({ message: `The blog ${title} by ${author} was added to the list` })
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
            <input id="title" value={title} onChange={handleTitleChange} style={formStyle} />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input id="author" value={author} onChange={handleAuthorChange} style={formStyle} />
          </div>
          <div>
            <label htmlFor="url">URL:</label>
            <input id="url" value={url} onChange={handleUrlChange} style={formStyle} />
          </div>
          <button type="submit">Add blog</button>
          <button onClick={toggleVisibility} style={{ marginLeft: 10 }}>Cancel</button>
        </form>
      </div>
    </>
  )
}

export default AddBlogForm