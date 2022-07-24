import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import ReceiveEmails from "./ReceiveEmails";

const Welcome = () => {
  const emails = useSelector((state) => state.inbox);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (emails) {
      let count = 0;
      Object.keys(emails.emails).map((email) => {
        if (emails.emails[email].read === false) {
          count = count + 1;
          setUnreadCount(count);
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
