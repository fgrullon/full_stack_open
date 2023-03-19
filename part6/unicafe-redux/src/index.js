import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'RESET'
    })
  }

  return (
    <div>
      <div>
        <button onClick={good}>good</button> 
        good {store.getState().good}
      </div>

      <div>
        <button onClick={ok}>ok</button>
        ok {store.getState().ok}
      </div>

      <div>
      <button onClick={bad}>bad</button>
        bad {store.getState().bad}
      </div>
      <div>
      <button onClick={reset}>reset stats</button>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
