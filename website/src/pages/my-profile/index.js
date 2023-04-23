import MPDetails from "./mp-details";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


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
        <div>
          <MPDetails/>
        </div>
        <div>
          <div>Visited Parks</div>
          <div>Park reviews</div>
          <div>Planned trips?</div>
        </div>
      </>
  );
}

export default MyProfile;