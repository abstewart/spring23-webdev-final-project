import LoginForm from "./login";

import MyProfile from "./my-profile";
import Profile from "./profile";
import Register from "./register";

function Project() {
  return(
    <div className="container row">
      <div className="col-6">
        <LoginForm/>
      </div>
      <div className="col-6">
        <Register/>
      </div>
      <div>
        <MyProfile/>
      </div>
      <div>
        <Profile/>
      </div>
    </div>
  );
}
export default Project;