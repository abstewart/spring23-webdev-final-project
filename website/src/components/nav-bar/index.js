import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../services/users/users-thunks";
import {useState} from "react";

const NavBar = ({active = null}) => {

  const { currentUser } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function refreshPage(){
    window.location.reload();
  }

  function handleSearch() {
    //navigate to /search/searchTerm
    navigate(`/search/${searchTerm}//`);
    refreshPage();
  }

  return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <div className="navbar-collapse" id="navbarColor01">
              <div className={""}>
                <Link className="navbar-collapse navbar-brand text-center" to="/home">National Parks!</Link>
              </div>
              <ul className="navbar-nav me-auto">
                <li className="nav-item text-center">
                  <Link className={`nav-link ${active === 'home'?'active':''}`} to="/home">Home</Link>
                </li>
                <li className="nav-item text-center">
                  <Link className={`nav-link ${active === 'search'?'active':''}`} to="/search">Search</Link>
                </li>
                <li className="nav-item text-center">
                  <Link className={`nav-link ${active === 'login'?'active':''}`} to="/login">Login</Link>
                </li>
                <li className="nav-item text-center">
                  <Link className={`nav-link ${active === 'register'?'active':''}`} to="/register">Register</Link>
                </li>
                <li className="nav-item text-center">
                  <Link className={`nav-link ${active === 'profile'?'active':''}`} to="/profile">Profile</Link>
                </li>
                <li className=" ps-3 ">
                  <div className="text-light h4 text-center row">
                    <div className={"col-lg-6 d-xl-block pt-3 d-lg-none pe-lg-5"}>
                      Welcome:&nbsp;
                      {currentUser ? currentUser.username : "Anonymous"}
                    </div>
                    <div className={"col-lg-6 pt-2 ps-xl-5 d-block"}>
                      {currentUser &&
                          <button onClick={() => {
                            dispatch(logoutThunk());
                            navigate("/home");
                          }}
                                  className="btn btn-warning">
                            Logout
                          </button>}
                    </div>
                  </div>
                </li>
              </ul>
              <div className="d-flex p-1">
                <input className="form-control me-sm-2" type="text"
                       placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="btn btn-secondary my-2 my-sm-0"
                        type="button" onClick={handleSearch}>Search
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
  );
}
export default NavBar;