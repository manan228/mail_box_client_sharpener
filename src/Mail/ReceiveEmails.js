import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { inboxActions } from "../redux_store/inboxSlice";
import SingleEmail from "./SingleEmail";

const ReceiveEmails = () => {
  const [singleEmail, setSingleEmail] = useState(false);

  const emails = useSelector((state) => state.inbox.emails);

  const dispatch = useDispatch();

  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  // const formattedLoggedInEmail = loggedInEmail.replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const formattedLoggedInEmail = loggedInEmail.replace(/[^a-zA-Z0-9]/g, "");

    const getEmails = async () => {
      try {
        const response = await axios.get(
          `https://mail-box-client-e6d4c-default-rtdb.firebaseio.com/${formattedLoggedInEmail}Inbox.json`
        );

        console.log(response.data);
        dispatch(inboxActions.onEmailFetch(response.data));
      } catch (err) {
        console.log(err);
      }
    };

    getEmails();
  }, [dispatch, loggedInEmail]);

  const onSingleEmailClickHandler = (email) => {
    setSingleEmail(email);
    // console.log(email)
  };

  return (
    <>
      <div>
        <ul>
          {!singleEmail &&
            emails &&
            Object.keys(emails).map((email) => {
              let read = false;
              if (emails[email].read !== false) {
                read = true;
              }
              return (
                <div onClick={() => onSingleEmailClickHandler(email)}>
                  <div>Received emails</div>
                  <li style={{ listStyleType: read ? "none" : "disc" }}>
                    <span style={{ marginRight: "1em" }}>
                      From: {emails[email].from}
                    </span>
                    <span style={{ marginRight: "1em" }}>
                      Subject: {emails[email].subject}
                    </span>
                    <span>Body: {emails[email].body}</span>
                  </li>
                </div>
              );
            })}
          {singleEmail && <SingleEmail emailDetails={{singleEmail, emails}}/>}
          {emails === null && <p>No emails found</p>}
        </ul>
      </div>
    </>
  );
};

export default ReceiveEmails;
