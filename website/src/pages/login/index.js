import NavBar from "../../components/nav-bar";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {loginThunk} from "../../services/users/users-thunks";

const LoginForm = () => {

  const { currentUser, loading, error } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = () => {
    //alert("login!, user: " + username + ", pass: " + password);
    console.log("trying to login");
    try {
      dispatch(loginThunk({username, password}));
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="container">
        <NavBar active={`login`}/>
        <h1 className={`display-3 text-center`}>Login</h1>

        <div>
          <div className="form-group">
            <label className="form-label mt-4" htmlFor="login_username">Username</label>
            <input
                className="form-control"
                id="login_username"
                type="text"
                placeholder="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
            />
          </div>
          <div className="form-group justify-content-sm-center">
            <label htmlFor="login_password" className="form-label mt-4">Password</label>
            <input type="password" className="form-control" id="login_password"
                   placeholder="password"
                   onChange={(e) => {
                     setPassword(e.target.value)}}
            />
          </div>
          <div>
            <a className="text-warning mt-4 visually-hidden" href={`#`}>Forgot password?</a>
          </div>
          <div>
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