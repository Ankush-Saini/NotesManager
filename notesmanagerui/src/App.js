import "./App.css";
import Users from "./Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotesMain from "./NotesMain";
import UserCreation from "./UserCreation";
import NotesCreation from "./NotesCreation";
function App() {
  return (
    <div className="App">
      <header className="App-header">Notes Manager</header>
      <body>
        <div id="root"></div>
        <Router>
          <Switch>
            <Route path="/" exact>
              {" "}
              <Users />
            </Route>
            <Route path="/users/:userId" exact component={NotesMain} />
            <Route path="/create-user" component={UserCreation} />
            <Route
              path="/users/:userId/create-notes"
              component={NotesCreation}
            />
          </Switch>
        </Router>
      </body>
    </div>
  );
}

export default App;
