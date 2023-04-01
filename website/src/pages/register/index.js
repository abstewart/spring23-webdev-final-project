import NavBar from "../../components/nav-bar";

//lots of examples here https://bootswatch.com/slate/

const Register = () => {
  return(
      <>
        <NavBar active="register"/>
        <h1 className={`display-3 text-center`}>Register</h1>
        <div className="form-floating mb-2">
          <input id="register_first_name" type="text" className="form-control"/>
          <label className={`text-dark`} htmlFor={`register_first_name`}>First Name</label>
        </div>
        <div className="form-floating mb-2">
          <input id="register_last_name" type="text" className="form-control"/>
          <label className={`text-dark`} htmlFor={`register_last_name`}>Last Name</label>
        </div>
        <div className="form-floating mb-2">
          <input id="register_email" type="text" className="form-control"/>
          <label className={`text-dark`} htmlFor={`register_email`}>Email</label>
        </div>
        <div className="form-floating">
          <input id="register_username" type="text" className="form-control"/>
          <label className={`text-dark`} htmlFor={`register_username`}>Username</label>
        </div>
        <div className="mt-3">
          <div className={`text-info`}>Password must be 8-32 characters in length, include 1 number, and one of ['!@#$%&*]</div>
          <div className="form-floating">
            <input id="register_password_1" type="password" className="form-control"/>
            <label className={`text-dark`} htmlFor={`register_password_1`}>Password</label>
          </div>

        </div>
        <div className="mt-3">
          <label className={`text-info`} htmlFor={`register_show_password`}>Show password: &nbsp;</label>
          <input type={`checkbox`} id={`register_show_password`}/>
        </div>
        <div className="form-floating">
          <input id="register_password_2" type="password" className="form-control"/>
          <label className={`text-dark`} htmlFor={`register_password_2`}>Repeat Password</label>
        </div>
      </>
  );
}

export default Register;