import MPDetails from "./mp-details";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/nav-bar";


const MyProfile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    if(!currentUser){
      navigate("/login")
    }
  }, [])

  return(
      <>
        <div className={`container`}>
          <NavBar active={`profile`}/>
          <MPDetails/>
          <div>Visited Parks</div>
          <div>Park reviews</div>
          <div>Planned trips?</div>
        </div>
      </>
  );
}

export default MyProfile;