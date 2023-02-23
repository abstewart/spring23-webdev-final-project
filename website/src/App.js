import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Project from "./project";



function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route index element={<Labs/>}/>
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
