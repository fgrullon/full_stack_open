import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(( props, refs ) => {
  const [visible, setVisible] = useState(false)

  const hide = { display : visible ? 'none' : '' }
  const show = { display : visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>{ props.buttonLabel }</button>
      </div>
      <div style={show}>
        { props.children }
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel : PropTypes.string.isRequired
}

export default Togglable