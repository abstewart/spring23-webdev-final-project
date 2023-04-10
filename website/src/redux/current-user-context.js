import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {profileThunk} from "../services/users/users-thunks";

function CurrentUserContext({children}) {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const getCurrUser = async () => {
    await dispatch(profileThunk());
  }

  useEffect(() => {
    getCurrUser();
  }, [])

  return children;
}

export default CurrentUserContext;