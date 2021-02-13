import React from "react";
import Moment from "react-moment";
import equal from "fast-deep-equal";
class NotesNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.noteType,
      userId: props.userId,
      noteNavData: [],
      isLoaded: false,
    };
  }

  fetchNotesData() {
    this.setState({ type: this.props.noteType });
    let apiUrl = "http://localhost:7021/users/" + this.state.userId + "/notes/";
    if (this.props.noteType == "D")
      apiUrl =
        "http://localhost:7021/users/" + this.state.userId + "/deleted-notes/";

    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonData) =>
        this.setState({ noteNavData: Object.values(jsonData), isLoaded: true })
      );
  }
  componentDidMount() {
    this.fetchNotesData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps === undefined) {
      this.fetchNotesData();
    } else if (!equal(this.props, prevProps)) {
      this.fetchNotesData();
    }
  }
  render() {
    if (!this.state.isLoaded) {
      return <div>loading Notes...</div>;
    }

    return (
      <div className="mail-list-container col-md-3 pt-4 pb-4 border-right bg-white">
        <div className="border-bottom pb-4 mb-3 px-3">
          <div className="form-group">
            <input
              className="form-control w-100"
              type="search"
              placeholder="Search notes"
              id="notes-rearch"
            />
          </div>
        </div>

        {this.state.noteNavData.map((singleUser) => {
          return (
            <div className="mail-list">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  <i className="input-helper"></i>
                </label>
              </div>
              <div className="content">
                <p className="message-text">{singleUser.title}</p>
                <p className="sender-name">
                  <Moment date={singleUser.creation_time} />
                </p>
              </div>
              <div className="details">
                <i className="mdi mdi-star-outline"></i>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default NotesNavbar;
