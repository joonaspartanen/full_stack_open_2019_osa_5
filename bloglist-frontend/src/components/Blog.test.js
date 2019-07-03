import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

const user = {
  name: 'Joonas',
  username: 'jpartanen'
}

const blog = {
  title: 'Testing Simple Blog component',
  author: 'Just Tester',
  likes: 5,
  user: user
}

test('renders content with hidden details', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const blogTitle = component.container.querySelector('.blog-title')

  expect(blogTitle).toHaveTextContent(
    'Testing Simple Blog component'
  )

  expect(blogTitle).toHaveTextContent(
    'Just Tester'
  )

  const blogDetails = component.container.querySelector('.blog-details')
  expect(blogDetails).toHaveStyle('display: none')
})

test('clicking the blog reveals details', async () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const blogTitle = component.container.querySelector('.blog-title')

  const blogDetails = component.container.querySelector('.blog-details')
  expect(blogDetails).toHaveStyle('display: none')

  fireEvent.click(blogTitle)

  expect(blogDetails).not.toHaveStyle('display: none')
  expect(blogDetails).toHaveTextContent('5 likes')
  expect(blogDetails).toHaveTextContent('added by Joonas')
})