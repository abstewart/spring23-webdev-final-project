//nav bar component

//not sure if should be in json or not

import {Link} from "react-router-dom";

const NavBar = () => {
  return(
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand text-light" href="#">Navbar</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              {/*TODO add search page*/}
              <Link className="nav-link" to="/home">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" >Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled" to="/my-profile">My Profile</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search"
                   placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0"
                    type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
  );
}
export default NavBar;