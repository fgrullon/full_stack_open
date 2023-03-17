import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  test('renders title and author by default but not url and likes', () => {
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

  test('renders url and likes when show button is clicked', async () => {
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

    const user = userEvent.setup()
    const button = container.querySelector('.showDetail')
    await user.click(button)

    const otherDetails = container.querySelector('.otherDetails')
    expect(otherDetails).not.toHaveStyle('display: none')
  })

  test('if like button is clicked twice the event handler is called twice', async () => {
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

    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} addLike={mockHandler} />)

    const user = userEvent.setup()
    const button = container.querySelector('.like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})


