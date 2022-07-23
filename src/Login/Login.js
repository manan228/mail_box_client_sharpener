import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux_store/auth-slice";

const Login = () => {
  const dispatch = useDispatch();

//   console.log(authActions)

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

      // console.log(response.data.idToken);
      const token = response.data.idToken;

      dispatch(authActions.onTokenReceive(token));
    } catch (err) {
      console.log(err);
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
        {/* {error === "EMAIL_EXISTS" && (
      <p>Email already registered, try to login with same email</p>
    )}
    {error === "OPERATION_NOT_ALLOWED" && (
      <p>
        Password sign-in is disabled for this project, contack webside
        developer
      </p>
    )} */}
      </form>
      <button>Forgot Password</button>
      <div>Dont have an account? Sign up</div>
    </>
  );
};

export default Login;
