import "./App.css";
import Users from "./Users";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NotesMain from "./NotesMain";
import NotesNavbar from "./NotesNavbar";
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
            <Route path="/users/:userId" component={NotesMain} />
            <Route path="/create-user" component={NotesMain} />
          </Switch>
        </Router>
      </body>
    </div>
  );
}

export default App;
