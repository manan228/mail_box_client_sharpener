import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux_store/authSlice.js";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const enteredEmailInputRef = useRef();
  const enteredPasswordInputRef = useRef();

  const onLoginFormSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = enteredEmailInputRef.current.value;
    const enteredPassword = enteredPasswordInputRef.current.value;

    const loginObj = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSGIIx2Pmrh_-2TsHbJVZbaGChD9djZF0`,
        loginObj
      );

      const token = response.data.idToken;

      dispatch(authActions.onTokenReceive(token));

      history.replace("/mail-box-client");
    } catch (err) {
      const error = err.response.data.error.errors[0].message;
      setError(error);
    }
  };

  return (
    <>
      <form onSubmit={onLoginFormSubmitHandler}>
        <h1>Login</h1>
        <div>
          <span>Email</span>
          <input type="email" required ref={enteredEmailInputRef} />
        </div>
        <div>
          <span>Password</span>
          <input type="password" required ref={enteredPasswordInputRef} />
        </div>
        <button type="submit">Login</button>
        {error === "EMAIL_NOT_FOUND" && (
          <p>Please check the email and try again</p>
        )}
        {error === "INVALID_PASSWORD" && <p>Incorrect password try again</p>}
      </form>
      <button>Forgot Password</button>
      <div>Dont have an account? Sign up</div>
    </>
  );
};

export default Login;
