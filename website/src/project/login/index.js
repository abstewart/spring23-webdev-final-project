const LoginForm = () => {
  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <div>
          <label htmlFor="login_username">Username</label>
          <input id="login_username" type="text"/>
        </div>
        <div>
          <label htmlFor={`login_password`}>Password</label>
          <input id={`login_password`} type="password"/>
        </div>
        <div>
          <a href={`#`}>Forgot password?</a>
        </div>
      </div>
    </>
  );
}

export default LoginForm;