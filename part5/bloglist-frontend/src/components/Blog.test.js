import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title : 'Rendering the component for test',
    author : 'Frank Grullon',
    url : 'http://undefined.com',
    likes : 5,
    user : {
      name : 'Frank G',
      username : 'fgrullon'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const titleAndAuthor = container.querySelector('.titleAndAuthor')
  expect(titleAndAuthor).not.toHaveStyle('display: none')

  const otherDetails = container.querySelector('.otherDetails')
  expect(otherDetails).toHaveStyle('display: none')


})