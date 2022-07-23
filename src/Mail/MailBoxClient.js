import { Redirect, useHistory } from "react-router-dom";
import ReceiveEmails from "./ReceiveEmails";

const Welcome = () => {
  const history = useHistory();

  const onComposeClickHandler = () => {
    history.replace("/compose");
    // return <>
    // {/* <Redirect to='/compose' /> */}
    //{/* </> */}
  };
  return (
    <>
      <h1>Welcome to Mail box client</h1>
      <button onClick={onComposeClickHandler}>Compose</button>
      <div>
        <ReceiveEmails />
      </div>
    </>
  );
};

export default Welcome;
