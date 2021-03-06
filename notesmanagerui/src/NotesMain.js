import React from "react";
import NotesNavbar from "./NotesNavbar";
import profileavater from "./images/avatar7.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NotesBody from "./NotesBody";
class NotesMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.userId,
      userName: props.location.state.userName,
      noteType: "N",
      noteId: null,
    };
    this.notesSelect = this.notesSelect.bind(this);
    this.deletedNotesSelect = this.deletedNotesSelect.bind(this);
    this.handleNoteClick = this.handleNoteClick.bind(this);
  }
  notesSelect(e) {
    e.preventDefault();
    this.setState({
      noteType: "N",
    });
  }
  deletedNotesSelect(e) {
    e.preventDefault();
    this.setState({
      noteType: "D",
    });
  }
  handleNoteClick(noteId) {
    this.setState({ noteId: noteId });
  }
  render() {
    return (
      <div>
        <aside>
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <img
                src={profileavater}
                alt="Profile"
                class="rounded-circle"
                width="150"
              />
              <div class="mt-3">
                <h4>{this.state.userName}</h4>
                {/* <p class="text-secondary mb-1">Full Stack Developer</p>
                                <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                <button class="btn btn-primary">Follow</button>
                                <button class="btn btn-outline-primary">Message</button> */}
              </div>
            </div>
          </div>
          <ul>
            <li>
              <button
                type="submit"
                onClick={() =>
                  this.props.history.push(
                    "/users/" + this.props.match.params.userId + "/create-notes"
                  )
                }
              >
                Compose
              </button>
            </li>
            <li>
              <a
                href="#"
                className={this.state.noteType == "N" ? "active" : null}
                onClick={this.notesSelect}
              >
                Notes
              </a>
            </li>
            <li>
              <a
                href="#"
                className={this.state.noteType == "D" ? "active" : null}
                onClick={this.deletedNotesSelect}
              >
                Deleted Notes
              </a>
            </li>
            {/* <Router>
              <Switch>
                <Route path="/notes/:noteType" component={NotesNavbar} />
              </Switch>
            </Router> */}
            <li>
              <a href="#">{this.props.match.params.userId}</a>
            </li>
          </ul>
          <button
            id="go-back"
            type="submit"
            onClick={() => this.props.history.push("/")}
          >
            Go back
          </button>
        </aside>

        <section class="notesSection">
          <nav class="notesNavbar">
            <NotesNavbar
              userId={this.state.userId}
              noteType={this.state.noteType}
              onNoteClick={this.handleNoteClick}
            />
          </nav>
          <article>
            <NotesBody
              userId={this.state.userId}
              noteType={this.state.noteType}
              noteId={this.state.noteId}
              history={this.props.history}
            />
          </article>
        </section>
      </div>
    );
  }
}

export default NotesMain;
