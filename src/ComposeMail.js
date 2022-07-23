import { useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const ComposeMail = () => {
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
      to: enteredTo,
      subject: enteredSubject,
      body: bodyText,
    };

    try {
      const response = await axios.post(
        `https://mail-box-client-e6d4c-default-rtdb.firebaseio.com/mailData.json`,
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
