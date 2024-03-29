

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2> log in to application </h2>
      </div>
      <div>
                username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
                password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

export default LoginForm