import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, user, setNotification }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setNotification={setNotification} />
      )}
    </div>
  )
}
export default Blogs