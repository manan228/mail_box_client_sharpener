import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../redux_store/inboxSlice";

const ReceiveEmails = () => {
  const emails = useSelector((state) => state.inbox.emails);
  console.log(emails);

  const dispatch = useDispatch();

  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  const formattedLoggedInEmail = loggedInEmail.replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
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
  }, [dispatch, formattedLoggedInEmail]);

  return (
    <>
      <div>Receive emails</div>
      <div>
        <ul>
          {Object.keys(emails).map((email) => {
            return (
              <li>
                <span style={{ marginRight: "1em" }}>
                  From: {emails[email].from}
                </span>
                <span style={{ marginRight: "1em" }}>
                  Subject: {emails[email].subject}
                </span>
                <span>Body: {emails[email].body}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ReceiveEmails;
