import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import MailBoxClient from "./Mail/MailBoxClient";
import ComposeMail from "./Mail/ComposeMail";

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
      </Switch>
    </div>
  );
}

export default App;
