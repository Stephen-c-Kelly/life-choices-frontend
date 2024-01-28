import SignupForm from "../components/signupForm/SignupForm";
import { useState } from "react";
import videoBg from '../media/videoBg.mp4';
import logo from '../media/logo.png'

const Signup = () => {
  const [message, setMessage] = useState(['']);

  const updateMessage = msg => {
    setMessage(msg);
  };

  return (
    <div className="signup">
      <video src={videoBg} autoPlay loop muted />
      <div>
        <img src={logo} className="logo"/>
        {/* <h1>Sign Up</h1> */}
        <p>{message}</p>
        <SignupForm updateMessage={updateMessage} />
      </div>
    </div>
  );
};

export default Signup;
