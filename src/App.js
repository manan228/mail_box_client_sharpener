import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import MailBoxClient from "./Mail/MailBoxClient";
import ComposeMail from "./Mail/ComposeMail";
import SingleEmail from "./Mail/SingleEmail";
import Sent from './Mail/Sent'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to='/login' />
        </Route>
        <Route path='/signup'><SignUp /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/mail-box-client'><MailBoxClient /></Route>
        <Route path='/compose'><ComposeMail /></Route>
        <Route path='/single-email'><SingleEmail /></Route>
        <Route path='/sent'><Sent /></Route>
      </Switch>
    </div>
  );
}

export default App;
