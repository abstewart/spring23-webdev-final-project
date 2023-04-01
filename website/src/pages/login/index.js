import NavBar from "../../components/nav-bar";

const LoginForm = () => {
  return (
      <div className="container">
        <NavBar active={`login`}/>
        <h1 className={`display-3 text-center`}>Login</h1>

        <div>
          <div className="form-group">
            <label className="form-label mt-4" htmlFor="login_username">Username</label>
            <input className="form-control" id="login_username" type="text" placeholder="username"/>
          </div>
          <div className="form-group justify-content-sm-center">
            <label htmlFor="login_password" className="form-label mt-4">Password</label>
            <input type="password" className="form-control" id="login_password" placeholder="password"/>
          </div>
          <div>
            <a className="text-warning mt-4 visually-hidden" href={`#`}>Forgot password?</a>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;