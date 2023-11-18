import React, { useRef, useState } from "react";
import Header from "./Header";
import { isValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPass = useRef(null);

  const handleSubmitForm = () => {
    const message = isValidData(email.current.value, password.current.value);
    setErrMsg(message);
    if (!isSignInForm && password.current.value !== confirmPass.current.value) {
      setErrMsg("confirm password does not matches the password");
      return;
    }

    if (errMsg !== null) return;

    isSignInForm
      ? signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/browse")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrMsg(errorCode, " - ", errorMessage);
          })
      : createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            updateProfile(auth.currentUser, {
              displayName: name.current.value
            }).then(() => {
              // Profile updated!
              const { uid, displayName, email } = auth.currentUser;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
              navigate("/browse")
            }).catch((error) => {
              // An error occurred
             setErrMsg(error.message)
            })
            const user = userCredential.user;
            
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrMsg(errorCode, " - ", errorMessage);
            // ..
          });
  };

  const handleToggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/cf244808-d722-428f-80a9-052acdf158ec/IN-en-20231106-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="BackGround img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-8 left-8 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {!isSignInForm && (
          <input
            ref={confirmPass}
            type="password"
            placeholder="Confirm Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <p className="text-red-700">{errMsg}</p>
        <button
          onClick={handleSubmitForm}
          type="submit"
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="cursor-pointer" onClick={handleToggleSignIn}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already user? Sign in."}
        </p>
      </form>
    </div>
  );
};

export default Login;
