import LoginForm from "./login";
import RegisterForm from "./register/register-form";
import MyProfile from "./my-profile";
import Profile from "./profile";

function Project() {
  return(
    <div className="container row">
      <div className="col-6">
        <LoginForm/>
      </div>
      <div className="col-6">
        <RegisterForm/>
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