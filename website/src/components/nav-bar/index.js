//nav bar component

import {Link} from "react-router-dom";


const NavBar = ({active = null}) => {
  return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">Website!</Link>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className={`nav-link ${active === 'home'?'active':''}`} to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${active === 'search'?'active':''}`} to="/search">Search</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${active === 'smth'?'active':''}`} to="#">smth</Link>
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
                  <div className="navbar-text">
                    <span>Welcome:&nbsp;</span>
                    <span>Anonymous</span>
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
              <div className="d-flex">
                <input className="form-control me-sm-2" type="text"
                       placeholder="Search"/>
                <button className="btn btn-secondary my-2 my-sm-0"
                        type="button">Search
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
  );
}
export default NavBar;