import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Project from "./pages";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import NavBar from "./components/nav-bar";
import Search from "./pages/search";

import store from "./redux/store";
import { Provider } from "react-redux";
import CurrentUserContext from "./redux/current-user-context";
import ParkDetails from "./components/park-details";
import SearchResults from "./pages/search-results";
import MyProfile from "./pages/my-profile";

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <CurrentUserContext>
              <Routes>
                <Route index element={<Home/>}/>
                <Route path={`/home`} element={<Home/>}/>
                <Route path={`/search`} element={<Search/>}/>
                <Route path={`/search/:val?/:keywords?/:state?/`} element={<SearchResults/>}/>
                <Route path={`/search/:keywords?/:state?/`} element={<SearchResults/>}/>
                <Route path={`/profile`} element={<MyProfile/>}/>
                <Route path={`/profile/:uid`} element={<Profile/>}/>
                <Route path={`/login`} element={<Login/>}/>
                <Route path={`/register`} element={<Register/>}/>
                <Route path={`/details/:pid`} element={<ParkDetails/>}/>

                {/*Testing route for multiple components*/}
                <Route path="/project" element={<Project/>}/>
                <Route path="/nav" element={<NavBar/>}/>

              </Routes>
            </CurrentUserContext>
          </div>
        </BrowserRouter>
      </Provider>
  );
}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
