import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/signup'><SignUp /></Route>
        <Route path='/login'><Login /></Route>
      </Switch>
    </div>
  );
}

export default App;
