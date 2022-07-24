import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../redux_store/inboxSlice";

const SingleEmail = (props) => {
  const dispatch = useDispatch();

  const emails = useSelector((state) => state.inbox.emails);
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  
  const singleEmailKey = props.emailDetails.singleEmail;

  dispatch(inboxActions.onEmailRead(singleEmailKey));

  console.log(emails[singleEmailKey]);

  useEffect(() => {
    const formattedLoggedInEmail = loggedInEmail.replace(/[^a-zA-Z0-9]/g, "");
    console.log(formattedLoggedInEmail)
    const emailRead = async () => {

        try {
            const response = await axios.put(
                `https://mail-box-client-e6d4c-default-rtdb.firebaseio.com/${formattedLoggedInEmail}Inbox/${singleEmailKey}.json`, emails[singleEmailKey]
              );
              console.log(emails[singleEmailKey]);
              console.log(response)
        } catch(err) {
            console.log(`error occurred`, err)
        }
    };

    emailRead();

  }, []);
  return (
    <>
      <div>From: {emails[singleEmailKey].from}</div>
      <div>Subject: {emails[singleEmailKey].subject}</div>
      <div>{emails[singleEmailKey].body}</div>
    </>
  );
};

export default SingleEmail;
