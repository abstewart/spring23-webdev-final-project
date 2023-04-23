import NavBar from "../../components/nav-bar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../services/users/users-thunks";
import {clearErrLoad} from "../../redux/users-reducer";
import {Link, useNavigate} from "react-router-dom";

const LoginForm = () => {

  const {loading, error } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async () => {
    //alert("login!, user: " + username + ", pass: " + password);
    console.log("trying to login");
    try {
      await dispatch(loginThunk({username, password})).unwrap();
    } catch (err) {
      console.log(err);
      return;
    }
    navigate("/profile");
  };

  useEffect(() => {dispatch(clearErrLoad())}, [])

  return (
      <div className="container">
        <NavBar active={`login`}/>
        <h1 className={`display-3 text-center`}>Login</h1>
        <h4 className={`text-center`}>
          <span className={`pe-2`}>No account?</span><Link to={"/register"}>Register</Link>
        </h4>
        <div>
          <div className="form-floating mt-2">
            <input id="login_username" type="text" className="form-control"
                   onChange={(e) => {setUsername(e.target.value)}}/>
            <label className={`wd-text-dark`} htmlFor={`login_username`}>Username</label>
          </div>
          <div className="form-floating mt-2">
            <input id="login_password" type="text" className="form-control"
                   onChange={(e) => {setPassword(e.target.value)}}/>
            <label className={`wd-text-dark`} htmlFor={`login_password`}>Password</label>
          </div>
          <div className={"pt-3"}>
            <button onClick={login} className="btn btn-primary">
              Login
            </button>
          </div>
          {
            loading &&
              <h2>Loading</h2>
          }
          {
            error &&
              <h2>{error}</h2>
          }
        </div>
      </div>
  );
}

export default LoginForm;

//code to display user and password
/*
<div>
            {currentUser && (
                <div>
                  <h2>{currentUser.username}</h2>
                  <h2>{currentUser.password}</h2>
                </div>
            )}
          </div>
 */