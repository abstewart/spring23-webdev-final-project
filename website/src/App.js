import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Project from "./pages";
import Home from "./pages/home";
import Login from "./pages/login";
import MyProfile from "./pages/my-profile";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Search from "./pages/search";



function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route index element={<Home/>}/>
            <Route path={`search`} element={<Search/>}/>
            <Route path={`profile`} element={<MyProfile/>}/>
            <Route path={`profile/:uid`} element={<Profile/>}/>
            <Route path={`login`} element={<Login/>}/>
            <Route path={`register`} element={<Register/>}/>
            <Route path={`details`} element={<Home/>}/>
            <Route path="/project" element={<Project/>}/>
          </Routes>
        </div>
      </BrowserRouter>
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
