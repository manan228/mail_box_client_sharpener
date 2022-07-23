import axios from "axios";
import { useRef, useState } from "react";

const SignUp = () => {
  const enteredEmailInputRef = useRef();
  const enteredPasswordInputRef = useRef();
  const enteredConfirmPasswordInputRef = useRef();

  const [error, setError] = useState(null);

  const onFormSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = enteredEmailInputRef.current.value;
    const enteredPassword = enteredPasswordInputRef.current.value;
    const enteredConfirmPassword = enteredConfirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      console.log("password do not match try again");
      return;
    }

    const signUpObj = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSGIIx2Pmrh_-2TsHbJVZbaGChD9djZF0`,
        signUpObj
      );

      if(response.status === 200) {
        console.log(`User has successfully signed up`)
      }

    } catch (err) {
      const error = err.response.data.error.errors[0].message;
      setError(error);
    }
  };

  return (
    <form onSubmit={onFormSubmitHandler}>
      <h1>Sign Up</h1>
      <div>
        <span>Email</span>
        <input type="email" required ref={enteredEmailInputRef} />
      </div>
      <div>
        <span>Password</span>
        <input type="password" required ref={enteredPasswordInputRef} />
      </div>
      <div>
        <span>Confirm Password</span>
        <input type="password" required ref={enteredConfirmPasswordInputRef} />
      </div>
      <button type="submit">Sign up</button>
      {error === "EMAIL_EXISTS" && (
        <p>Email already registered, try to login with same email</p>
      )}
      {error === "OPERATION_NOT_ALLOWED" && (
        <p>
          Password sign-in is disabled for this project, contack webside
          developer
        </p>
      )}
    </form>
  );
};

export default SignUp;
