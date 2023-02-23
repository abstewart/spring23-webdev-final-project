const Register = () => {
  return(
      <>
        <h1>Register</h1>
        <div className="form-floating">
          <input id="register_first_name" type="text" className="form-control"/>
          <label htmlFor={`register_first_name`}>First Name</label>
        </div>
        <div className="form-floating">
          <input id="register_last_name" type="text" className="form-control"/>
          <label htmlFor={`register_last_name`}>Last Name</label>
        </div>
        <div className="form-floating">
          <input id="register_email" type="text" className="form-control"/>
          <label htmlFor={`register_email`}>Email</label>
        </div>
        <div className="form-floating">
          <input id="register_username" type="text" className="form-control"/>
          <label htmlFor={`register_username`}>Username</label>
        </div>
        <div>
          <div>Password must be 8-32 characters in length, and include 1 number and one of '!@#$%&*</div>
          <div className="form-floating">
            <input id="register_password_1" type="password" className="form-control"/>
            <label htmlFor={`register_password_1`}>Password</label>
          </div>

        </div>
        <div>
          <label htmlFor={`register_show_password`}>Show password: &nbsp;</label>
          <input type={`checkbox`} id={`register_show_password`}/>
        </div>
        <div className="form-floating">
          <input id="register_password_2" type="password" className="form-control"/>
          <label htmlFor={`register_password_2`}>Repeat Password</label>
        </div>
      </>
  );
}

export default Register;