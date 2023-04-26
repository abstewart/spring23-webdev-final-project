import NavBar from "../../components/nav-bar";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../../services/users/users-thunks";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {clearErrLoad, setError} from "../../redux/users-reducer";

//lots of examples here https://bootswatch.com/slate/

const Register = () => {
    const {loading, error} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rUser, setRUser] = useState({role: "USER"});

    //clear any error message from other screens
    useEffect(() => {dispatch(clearErrLoad())}, [])
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

    const tryRegister = async () => {
        console.log("trying to register");
        //validate fields

        if(rUser.pass1 !== rUser.pass2){
            console.log("setting error");
            dispatch(setError("Passwords must match!"));
            return;
        }
        //construct user to try
        const tUser = {
            first_name : rUser.fname,
            last_name : rUser.lname,
            email : rUser.email,
            username : rUser.username,
            password : rUser.pass1,
            role : rUser.role,
        }

        try{
            await dispatch(registerThunk(tUser)).unwrap();
        } catch (err) {
            console.log("ERROR!");
            console.log(err.message)
        }
        navigate("/profile");
    };



  return(
      <div className={`container`}>
        <NavBar active="register"/>
          <h1 className={`display-3 text-center`}>Register</h1>
          <h4 className={`text-center`}>
              <span className={`pe-2`}>Already signed up?</span><Link to={"/login"}>Login</Link>
          </h4>
          <div className={"signup-form"}>
              <div className={"form-group"}>
                  <div className={"row pt-3"}>
                      <div className="form-floating col-6">
                          <input id="register_first_name" type="text" className="form-control"
                                 onChange={(e) => {
                                     setRUser({...rUser, fname: e.target.value})}}/>
                          <label className={`wd-text-dark`} htmlFor={`register_first_name`}>First Name</label>
                      </div>
                      <div className="form-floating col-6">
                          <input id="register_last_name" type="text" className="form-control"
                                 onChange={(e) => {
                                     setRUser({...rUser, lname: e.target.value})}}/>
                          <label className={`wd-text-dark`} htmlFor={`register_last_name`}>Last Name</label>
                      </div>
                  </div>
              </div>
              <div className={"row pt-3"}>
                  <div className="form-floating">
                      <input id="register_email" type="text" className="form-control"
                             onChange={(e) => {
                                 setRUser({...rUser, email: e.target.value})}}/>
                      <label className={`wd-text-dark`} htmlFor={`register_email`}>Email</label>
                  </div>
              </div>
              <div className={"row pt-3"}>
                  <div className="form-floating">
                      <input id="register_username" type="text" className="form-control"
                             onChange={(e) => {
                                 setRUser({...rUser, username: e.target.value})}}/>
                      <label className={`wd-text-dark`} htmlFor={`register_username`}>Username</label>
                  </div>
              </div>
              <div className={"form-group"}>
                  <div className={"row pt-3 pb-3"}>
                      <div className="col-6">
                          <div className="form-floating">
                              <input id="register_password_1" type="password" className="form-control ps-3"
                                     onChange={(e) => {
                                         setRUser({...rUser, pass1: e.target.value})}}/>
                              <label className={`wd-text-dark ps-1`} htmlFor={`register_password_1`}>Password</label>
                          </div>
                          <div className="mt-3">
                              <label className={`text-secondary text-light`} htmlFor={`register_show_password`}>Show password: &nbsp;</label>
                              <input type={`checkbox`} id={`register_show_password`} onClick={handlePasswordToggle}/>
                          </div>
                      </div>
                      <div className="form-floating col-6">
                          <input id="register_password_2" type="password" className="form-control"
                                 onChange={(e) => {
                                     setRUser({...rUser, pass2: e.target.value})}}/>
                          <label className={`wd-text-dark`} htmlFor={`register_password_2`}>Repeat Password</label>
                      </div>
                  </div>
              </div>
              <div className={"form-group"}>
                  <span className="text-light me-3">Role:</span>
                  <div className="form-check form-check-inline me-5">
                      <input className="form-check-input" type="radio"
                             name="inlineRadioOptions" id="inlineRadio1"
                             value="User" checked onChange={(e) => {
                          setRUser({...rUser, role: "USER"})}}/>
                          <label className="form-check-label"
                                 htmlFor="inlineRadio1">User</label>
                  </div>
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio"
                             name="inlineRadioOptions" id="inlineRadio2"
                             value="Admin" onChange={(e) => {
                          setRUser({...rUser, role: "ADMIN"})}}/>
                          <label className="form-check-label"
                                 htmlFor="inlineRadio2">Admin</label>
                  </div>
              </div>
              <button type="button" onClick={tryRegister} className={"btn btn-primary"}>
                  Register
              </button>
              <div className={"row"}>
                  {loading && <span>Loading</span>}
              </div>
              <div className={"row"}>
                  {error && <span className="text-danger display-6"> {error} </span>}
              </div>


          </div>
      </div>
  );
}

export default Register;