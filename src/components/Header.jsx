import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_ICON } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser())
    }).catch((error) => {
      // An error happened.
      
    });
    
  }

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
        navigate("/browse")
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser())
        navigate("/")
      }
    });
    return ()=> unsubscribe()
  }, []);

  return (
    <div className="absolute w-full bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44 mx-4"
        src={LOGO}
        alt="Logo"
      />
      {user && <div className="flex ">
        <div>
        <img
          className="w-16 p-2 mx-2"
          src={USER_ICON}
          alt="user icon"
        />
         {user.displayName}
        </div>
        <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold my-5 mx-2 px-2 rounded">
          sign out
        </button>
      </div>}
    </div>
  );
};

export default Header;
