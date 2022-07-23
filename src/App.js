import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Welcome from "./Welcome";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="*" exact>
          <Login />
        </Route>
        <Route path='/signup'><SignUp /></Route>
        <Route path='/login' exact><Login /></Route>
        <Route path='/mail-box-client'><Welcome /></Route>
      </Switch>
    </div>
  );
}

export default App;
