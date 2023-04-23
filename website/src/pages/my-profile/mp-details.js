import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {clearErrLoad, setError} from "../../redux/users-reducer";
import {updateUserThunk} from "../../services/users/users-thunks";

const MPDetails = () => {

  const {currentUser, loading, error} = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const initialUser = {
    ...currentUser,
    password: "",
  }
  const [uUser, setUUser] = useState(initialUser);
  const [oldPass, setOldPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");

  //clear any error message from other screens
  useEffect(() => {dispatch(clearErrLoad())}, [])

  const handlePasswordToggle = () => {
    const passwordInput = document.getElementById("new_password_1");
    const passwordInput2 = document.getElementById("new_password_2");
    const oldPassword = document.getElementById("old_password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordInput2.type = "text";
      oldPassword.type = "text";
    } else {
      passwordInput.type = "password";
      passwordInput2.type = "password";
      oldPassword.type = "password";
    }
  }

  const tryUpdate = async () => {
    console.log("trying to update!");

    //check if old password is good
    if(currentUser.password !== oldPass ){
      dispatch(setError("Old password must be correct!"));
      return;
    }
    //check if new passwords match
    if(newPass1 !== newPass2) {
      dispatch(setError("New passwords must match!"));
      return;
    }
    //make the newUser update object
    let settingUser = {
      first_name: uUser.first_name,
      last_name: uUser.last_name,
      username: uUser.username,
      email: uUser.email,
    };

    //only set the password if it's changed
    if(newPass1 !== "") {
      settingUser.password = newPass1;
    }

    //try to update the user

    console.log(settingUser);

    try {
      await dispatch(updateUserThunk(settingUser)).unwrap();
    } catch (err) {
      console.log("ERROR!");
      console.log(err.message);
    }

    //clear the error message

  }


  return(
      <div className={`container`}>
        <h1 className={`display-3 text-center`}> Profile Details </h1>

        <div className={"form-group"}>
          <div className={"row pt-3"}>
            <div className="form-floating col-6">
              <input id="profile_first_name" type="text" className="form-control"
                     value={`${uUser.first_name}`}
                     onChange={(e) => {
                       setUUser({...uUser, first_name: e.target.value})}}/>
              <label className={`wd-text-dark`} htmlFor={`profile_first_name`}>First Name</label>
            </div>
            <div className="form-floating col-6">
              <input id="profile_last_name" type="text" className="form-control"
                     value={`${uUser.last_name}`}
                     onChange={(e) => {
                       setUUser({...uUser, last_name: e.target.value})}}/>
              <label className={`wd-text-dark`} htmlFor={`profile_last_name`}>Last Name</label>
            </div>
          </div>
        </div>
        <div className={"row pt-3"}>
          <div className="form-floating">
            <input id="profile_email" type="text" className="form-control"
                   value={`${uUser.email}`}
                   onChange={(e) => {
                     setUUser({...uUser, email: e.target.value})}}/>
            <label className={`wd-text-dark`} htmlFor={`profile_email`}>Email</label>
          </div>
        </div>
        <div className={"row pt-3"}>
          <div className="form-floating">
            <input id="profile_username" type="text" className="form-control"
                   value={`${uUser.username}`}
                   onChange={(e) => {
                     setUUser({...uUser, username: e.target.value})}}/>
            <label className={`wd-text-dark`} htmlFor={`profile_username`}>Username</label>
          </div>
        </div>
        <div className={"row pt-3"}>
          <div className="form-floating">
            <input id="old_password" type="password" className="form-control"
                   onChange={(e) => {
                     setOldPass(e.target.value)}}/>
            <label className={`wd-text-dark`} htmlFor={`old_password`}>Old Password</label>
          </div>
        </div>
        <div className={"form-group"}>
          <div className={"row pt-3 pb-3"}>
            <div className="col-6">
              <div className="form-floating">
                <input id="new_password_1" type="password" className="form-control ps-3"
                       onChange={(e) => {
                         setNewPass1(e.target.value)}}/>
                <label className={`wd-text-dark ps-1`} htmlFor={`register_password_1`}>New Password</label>
              </div>
              <div className="mt-3">
                <label className={`text-secondary text-light`} htmlFor={`register_show_password`}>Show passwords: &nbsp;</label>
                <input type={`checkbox`} id={`register_show_password`} onClick={handlePasswordToggle}/>
              </div>
            </div>
            <div className="form-floating col-6">
              <input id="new_password_2" type="password" className="form-control"
                     onChange={(e) => {
                       setNewPass2(e.target.value)}}/>
              <label className={`wd-text-dark`} htmlFor={`register_password_2`}>Repeat New Password</label>
            </div>
          </div>
        </div>
        <button type="button" onClick={tryUpdate} className={"btn btn-primary"}>
          Update Profile
        </button>
          <a href={"/profile/" + currentUser.username}> <button type="button" className={"btn btn-primary"}> See Public Profile </button> </a>
        <div className={"row"}>
          {loading && <span>Loading</span>}
        </div>
        <div className={"row"}>
          {error && <span className="text-danger display-6"> {error} </span>}
        </div>
      </div>
  );
}

export default MPDetails;


/*
return(
      <>
        <h1 className={`display-3 text-center`}> Profile Details </h1>
        <div className="form-floating">
          <input id="mp_first_name" type="text" className="form-control" value={`Andrew`}/>
          <label className={`wd-text-dark`} htmlFor={`mp_first_name`}>First Name</label>
        </div>

        <div className="form-floating">
          <input id="mp_last_name" type="text" className="form-control" value={`Briasco-Stewart`}/>
          <label className={`wd-text-dark`} htmlFor={`mp_last_name`}>Last Name</label>
        </div>

        <div className="form-floating">
          <input id="mp_email" type="text" className="form-control" value={`briasco-stewart.a@northeastern.edu`}/>
          <label className={`wd-text-dark`} htmlFor={`mp_email`}>Email</label>
        </div>

        <div className="form-floating">
          <input id="mp_username" type="text" className="form-control" value={`abriasco`}/>
          <label className={`wd-text-dark`} htmlFor={`mp_username`}>Username</label>
        </div>

        <div className="form-floating">
          <input id="mp_password_old" type="password" className="form-control"/>
          <label className={`wd-text-dark`} htmlFor={`mp_password_old`}>Old Password</label>
        </div>

        <div>
          <div className="form-floating">
            <input id="mp_password_1" type="password" className="form-control"/>
            <label className={`wd-text-dark`} htmlFor={`mp_password_1`}>Password</label>
          </div>
        </div>

        <div>
          <label htmlFor={`mp_show_password`}>Show password: &nbsp;</label>
          <input className={`wd-text-dark`} type={`checkbox`} id={`mp_show_password`}/>
        </div>

        <div className="form-floating">
          <input id="mp_password_2" type="password" className="form-control"/>
          <label className={`wd-text-dark`} htmlFor={`mp_password_2`}>Repeat Password</label>
        </div>
      </>
  );
 */