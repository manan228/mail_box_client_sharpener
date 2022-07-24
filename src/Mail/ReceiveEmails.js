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
  const formattedLoggedInEmail = loggedInEmail.replace(/[^a-zA-Z0-9]/g, "");

  const getEmails = async () => {
    try {
      const response = await axios.get(
        `https://mail-box-client-e6d4c-default-rtdb.firebaseio.com/${formattedLoggedInEmail}Inbox.json`
      );

      console.log(response.data);
      // if(response.data) {
        dispatch(inboxActions.onEmailFetch(response.data));
      // }
      // dispatch(inboxActions.onEmailFetch(response.data));
      console.log(`after dispatch`)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // const getEmails = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://mail-box-client-e6d4c-default-rtdb.firebaseio.com/${formattedLoggedInEmail}Inbox.json`
    //     );

    //     console.log(response.data);
    //     dispatch(inboxActions.onEmailFetch(response.data));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // if(emails){
      // console.log(`inside useEffect if`)
      getEmails();
    // } else {
      // console.log(`inside useEffect else`)
    // }

    // console.log(`inside useEffect after if`)
    
  }, [dispatch, loggedInEmail]);

  const onSingleEmailClickHandler = (email) => {
    setSingleEmail(email);
    // console.log(email)
  };

  const onDeleteClickHandler = async (email) => {
    console.log(email);
      try {

        const response = await axios.delete(`https://mail-box-client-e6d4c-default-rtdb.firebaseio.com/${formattedLoggedInEmail}Inbox/${email}.json`)

        console.log(response)

        getEmails();
      } catch(err) {
        console.log(err)
      }
  };

  return (
    <>
      <div>
        {console.log(emails, singleEmail)}
        <ul>
          {!singleEmail &&
            emails !== null &&
            Object.keys(emails).map((email) => {
              let read = false;
              if (emails[email].read !== false) {
                read = true;
              }
              return (
                <div>
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
                  <button onClick={() => onDeleteClickHandler(email)}>
                    Delete
                  </button>
                </div>
              );
            })}
          {singleEmail && (
            <SingleEmail emailDetails={{ singleEmail, emails }} />
          )}
          {console.log(`line 103`)}
          {emails === null && <p>No emails found</p>}
          {console.log(`line 105`)}
        </ul>
      </div>
    </>
  );
};

export default ReceiveEmails;
