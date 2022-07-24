import { useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";

const ComposeMail = () => {
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  console.log("loggied in Email:", loggedInEmail);
  const enteredToInputRef = useRef();
  const enteredSubjectInputRef = useRef();
  let bodyText;

  const onEditorStateChange = (event) => {
    bodyText = event.getCurrentContent().getPlainText();
  };

  const onSendClickHandler = async () => {
    const enteredTo = enteredToInputRef.current.value;
    const enteredSubject = enteredSubjectInputRef.current.value;

    const mailDataObj = {
      from: loggedInEmail,
      subject: enteredSubject,
      body: bodyText,
      read: false,
    };

    const toFormattedEmail = enteredTo.replace(/[^a-zA-Z0-9]/g, "");

    try {
      const response = await axios.post(
        `https://mail-box-client-e6d4c-default-rtdb.firebaseio.com/${toFormattedEmail}Inbox.json`,
        mailDataObj
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <span>To</span>
        <input type="email" ref={enteredToInputRef} />
      </div>
      <hr />
      <input placeholder="Subject" ref={enteredSubjectInputRef} />
      <hr />
      <Editor onEditorStateChange={onEditorStateChange} />
      <button onClick={onSendClickHandler}>Send</button>
    </>
  );
};

export default ComposeMail;
