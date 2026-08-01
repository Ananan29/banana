import React from "react"
import { useNavigate } from "react-router-dom";
const Profile = ({LoggedIn,setLoggedIn}) => {
  const navigate = useNavigate();
  const logOutClicked=()=>{
    setLoggedIn(false);
    navigate("/");
  }
  return (
    <>
      Profile
      {!LoggedIn?(
        <p>log in to access this feauture</p>
      ):(
        <button onClick={logOutClicked}>Log out</button>
      )}
    </>
  )
}

export default Profile