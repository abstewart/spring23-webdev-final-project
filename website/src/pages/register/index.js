import NavBar from "../../components/nav-bar";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../../services/users/users-thunks";
import {useState} from "react";

//lots of examples here https://bootswatch.com/slate/

const Register = () => {
    const {loading, error} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [rUser, setRUser] = useState({});
    const handlePasswordToggle = () => {
        const passwordInput = document.getElementById("register_password_1");
        const passwordInput2 = document.getElementById("register_password_2");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordInput2.type = "text";
        } else {
            passwordInput.type = "password";
            passwordInput2.type = "password";
        }
    }

    const tryRegister = () => {
        console.log("trying to register");
        //todo validate fields?
        try {
            dispatch(registerThunk({rUser}));
            //todo navigate to profile screen
        } catch (err) {
            console.log(err);
        }
    };



  return(
      <div className={`container`}>
        <NavBar active="register"/>
          <div className={"signup-form"}>
              <h1 className={`display-3 text-center`}>Register</h1>
              <div className={"form-group"}>
                  <div className={"row pt-3"}>
                      <div className="form-floating col-6">
                          <input id="register_first_name" type="text" className="form-control"/>
                          <label className={`text-dark`} htmlFor={`register_first_name`}>First Name</label>
                      </div>
                      <div className="form-floating col-6">
                          <input id="register_last_name" type="text" className="form-control"/>
                          <label className={`text-dark`} htmlFor={`register_last_name`}>Last Name</label>
                      </div>
                  </div>
              </div>
              <div className={"row pt-3"}>
                  <div className="form-floating">
                      <input id="register_email" type="text" className="form-control"/>
                      <label className={`text-dark`} htmlFor={`register_email`}>Email</label>
                  </div>
              </div>
              <div className={"row pt-3"}>
                  <div className="form-floating">
                      <input id="register_username" type="text" className="form-control"/>
                      <label className={`text-dark`} htmlFor={`register_username`}>Username</label>
                  </div>
              </div>
              <div className={"form-group"}>
                  <div className={"row pt-3"}>
                      <div className="col-6">
                          <div className="form-floating">
                              <input id="register_password_1" type="password" className="form-control"/>
                              <label className={`text-dark`} htmlFor={`register_password_1`}>Password</label>
                          </div>
                          {/*<div className={`text-info`}>Password must be 8-32 characters in length, include 1 number, and one of ['!@#$%&*]</div>*/}
                          <div className="mt-3">
                              <label className={`text-secondary`} htmlFor={`register_show_password`}>Show password: &nbsp;</label>
                              <input type={`checkbox`} id={`register_show_password`} onClick={handlePasswordToggle}/>
                          </div>
                      </div>
                      <div className="form-floating col-6">
                          <input id="register_password_2" type="password" className="form-control"/>
                          <label className={`text-dark`} htmlFor={`register_password_2`}>Repeat Password</label>
                      </div>
                  </div>
              </div>
              <button type="button" onClick={tryRegister} className={"btn btn-primary"}>
                  Register
              </button>
              <div className={"row"}>
                  {loading && <span>Loading</span>}
              </div>
              <div className={"row"}>
                  {error && <span>{error}</span>}
              </div>


          </div>
      </div>
  );
}

export default Register;