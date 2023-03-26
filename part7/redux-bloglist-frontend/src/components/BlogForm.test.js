import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {

  test('renders title and author by default but not url and likes', async () => {
    const blog = {
      title : 'Rendering the component for test',
      author : 'Frank Grullon',
      url : 'http://undefined.com'
    }

    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()
    const button = screen.getByText('create')

    const title = container.querySelector('.title')
    await user.type(title, blog.title)
    const author = container.querySelector('.author')
    await user.type(author, blog.author)
    const url = container.querySelector('.url')
    await user.type(url, blog.url)

    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url)


  })
})