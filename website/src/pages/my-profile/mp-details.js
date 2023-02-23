const MPDetails = () => {
  return(
      <>
        <h1>Profile Details</h1>
        <div>
          <img src={`https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg`} width={`80`}/>
          <button type={`button`}>Upload new</button>
        </div>
        <div className="form-floating">
          <input id="mp_first_name" type="text" className="form-control" value={`Andrew`}/>
          <label htmlFor={`mp_first_name`}>First Name</label>
        </div>

        <div className="form-floating">
          <input id="mp_last_name" type="text" className="form-control" value={`Briasco-Stewart`}/>
          <label htmlFor={`mp_last_name`}>Last Name</label>
        </div>

        <div className="form-floating">
          <input id="mp_email" type="text" className="form-control" value={`briasco-stewart.a@northeastern.edu`}/>
          <label htmlFor={`mp_email`}>Email</label>
        </div>

        <div className="form-floating">
          <input id="mp_username" type="text" className="form-control" value={`abriasco`}/>
          <label htmlFor={`mp_username`}>Username</label>
        </div>

        <div className="form-floating">
          <input id="mp_password_old" type="password" className="form-control"/>
          <label htmlFor={`mp_password_old`}>Old Password</label>
        </div>

        <div>
          <div>Password must be 8-32 characters in length, and include 1 number and one of '!@#$%&*</div>
          <div className="form-floating">
            <input id="mp_password_1" type="password" className="form-control"/>
            <label htmlFor={`mp_password_1`}>Password</label>
          </div>
        </div>

        <div>
          <label htmlFor={`mp_show_password`}>Show password: &nbsp;</label>
          <input type={`checkbox`} id={`mp_show_password`}/>
        </div>

        <div className="form-floating">
          <input id="mp_password_2" type="password" className="form-control"/>
          <label htmlFor={`mp_password_2`}>Repeat Password</label>
        </div>
      </>
  );
}

export default MPDetails;