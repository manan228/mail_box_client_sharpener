import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Sent = () => {
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  console.log(loggedInEmail);

  const [receivedEmails, setReceivedEmails] = useState([]);
  console.log(receivedEmails);

  useEffect(() => {
    const receiveSentMail = async () => {
      const formattedLoggedInEmail = loggedInEmail.replace(/[^a-zA-Z0-9]/g, "");
      try {
        const response = await axios.get(
          `https://mail-box-client-e6d4c-default-rtdb.firebaseio.com/${formattedLoggedInEmail}SentMail.json`
        );

        const receivedEmailsObj = response.data;

        setReceivedEmails(receivedEmailsObj);
      
    } catch (err) {
        console.log(err);
      }
    };

    receiveSentMail();
  }, []);
  return (
    <>
      Inside sent component
      <div>
        {Object.keys(receivedEmails).map((email) => {
              console.log(`inside email found`,email)
              let read = false;
              if (receivedEmails[email].read !== false) {
                read = true;
              }
              return (
                <div>
                  {/* <div onClick={() => onSingleEmailClickHandler(email)}> */}
                    <div>Received emails</div>
                    <li style={{ listStyleType: read ? "none" : "disc" }}>
                      <span style={{ marginRight: "1em" }}>
                        From: {receivedEmails[email].from}
                      </span>
                      <span style={{ marginRight: "1em" }}>
                        Subject: {receivedEmails[email].subject}
                      </span>
                      <span>Body: {receivedEmails[email].body}</span>
                    </li>
                  </div>
                 // {/* <button onClick={() => onDeleteClickHandler(email)}>
                 //   Delete
                 // </button> */}
                // </div>
              );
            })}
      </div>
    </>
  );
};

export default Sent;
