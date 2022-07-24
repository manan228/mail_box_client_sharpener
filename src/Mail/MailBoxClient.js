import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import ReceiveEmails from "./ReceiveEmails";

const Welcome = () => {
  const emails = useSelector((state) => state.inbox);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    console.log(Object.keys(emails.emails));
    console.log(emails.emails);
    if (emails) {
      console.log(emails)
      Object.keys(emails.emails).map((email) => {
    console.log(emails.emails[email])
            if (emails.emails[email].read === false) {
              console.log(`inside`, email)
          setUnreadCount(unreadCount + 1);
        }
      });
    }
  }, [emails]);

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
      <div>Unread emails {unreadCount}</div>
      {/* <span>{unreadCount}</span> */}
      <div>
        <ReceiveEmails />
      </div>
    </>
  );
};

export default Welcome;
