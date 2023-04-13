import PDetails from "./p-details";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import NavBar from "../../components/nav-bar";

const getUserByUsername = async () => {
  //const user = await userService.findUserByUsername
}

const Profile = () => {
  return(
      <>
        <div className="container">
          <NavBar/>
          <PDetails/>
        </div>
      </>
  );
}
export default Profile;