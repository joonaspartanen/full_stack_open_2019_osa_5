import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user, setNotification }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = { ...blog, likes: blog.likes + 1 }

      await blogService.update(blogObject)
      setBlogs(blogs.map(b => b.id !== blogObject.id ? b : blogObject))

    } catch (exception) {
      setNotification({ message: 'Updating blog failed', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    }
  }

  const removeButton = () => {
    if (blog.user.username === user.username) {
      return (
        <div style={blogRow}><button onClick={removeBlog}>remove</button></div>
      )
    }

    return null
  }

  const removeBlog = async event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotification({ message: `Blog ${blog.title} removed successfully` })
        setTimeout(() => {
          setNotification({ message: null })
        }, 5000)
      } catch (exception) {
        setNotification({ message: `Blog ${blog.title} has already been removed`, type: 'error' })
        setTimeout(() => {
          setNotification({ message: null })
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    }
  }

  const blogAdder = () => {
    if (blog.user.name) {
      return (
        <div style={blogRow}>added by {blog.user.name}</div>
      )
    }
    return (
      <div>
        <div style={blogRow}>added by {user.name}</div>
        <div style={blogRow}><button onClick={removeBlog}>remove</button></div>
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 4,
    paddingLeft: 4,
    marginBottom: 10,
    marginTop: 4,
    border: '1px solid'
  }

  const blogRow = {
    marginBottom: 6
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} style={blogRow} className='blog-title'>
        <strong>{blog.title} - {blog.author}</strong>
      </div>
      <div style={showWhenVisible} className='blog-details'>
        <div style={blogRow}><a href={`//${blog.url}`}> {blog.url}</a></div>
        <div style={blogRow}>{blog.likes} likes<button onClick={updateBlog} style={{ marginLeft: 5 }}>like</button></div>
        {blogAdder()}
        {removeButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Blog