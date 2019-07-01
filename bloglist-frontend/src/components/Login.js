import React from 'react'

const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {

  const formStyle = {
    marginLeft: .5 + 'em',
    marginBottom: 1 + 'em'
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
      <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            style={formStyle}
          />
        </div>
        <div>
          Password
      <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={formStyle}
          />
        </div>
        <button type="submit" style={formStyle}>Login</button>
      </form>
    </>
  )
}

export default Login