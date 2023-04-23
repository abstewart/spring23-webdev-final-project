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
            <Link className="navbar-brand" to="/home">National Parks!</Link>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className={`nav-link ${active === 'home'?'active':''}`} to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${active === 'search'?'active':''}`} to="/search">Search</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${active === 'login'?'active':''}`} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${active === 'register'?'active':''}`} to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${active === 'profile'?'active':''}`} to="/profile">Profile</Link>
                </li>
                <li className="d-flex p-2">
                  <div className="text-light h4 mb-0 align-self-center">
                    <span>Welcome:&nbsp;</span>
                    <span>{currentUser ? currentUser.username : "Anonymous"}
                    </span>
                  </div>
                </li>
                {/*<li className="nav-item dropdown">*/}
                {/*  <a className="nav-link dropdown-toggle"*/}
                {/*     data-bs-toggle="dropdown" href="#" role="button"*/}
                {/*     aria-haspopup="true" aria-expanded="false">Dropdown</a>*/}
                {/*  <div className="dropdown-menu">*/}
                {/*    <a className="dropdown-item" href="#">Action</a>*/}
                {/*    <a className="dropdown-item" href="#">Another action</a>*/}
                {/*    <a className="dropdown-item" href="#">Something else*/}
                {/*      here</a>*/}
                {/*    <div className="dropdown-divider"></div>*/}
                {/*    <a className="dropdown-item" href="#">Separated link</a>*/}
                {/*  </div>*/}
                {/*</li>*/}
              </ul>
              <div className="d-flex p-1">
                {currentUser &&
                    <button onClick={() => dispatch(logoutThunk())}
                    className="btn btn-warning">
                      Logout
                    </button>}
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