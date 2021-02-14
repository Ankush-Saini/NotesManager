import React from "react";
import "./NotesBody.css";
import equal from "fast-deep-equal";
import { relativeTimeThreshold } from "moment";
class NotesBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: props.noteId,
      noteData: "",
      type: "N",
      userId: props.userId,
    };
    this.deleteNotes = this.deleteNotes.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps === undefined) {
      this.fetchNotesContent();
    } else if (!equal(this.props, prevProps)) {
      this.fetchNotesContent();
    }
  }

  fetchNotesContent() {
    this.setState({
      type: this.props.noteType,
      userId: this.props.userId,
      noteId: this.props.noteId,
    });
    let apiUrl = "http://localhost:7021/users/" + this.state.userId + "/notes/";
    if (this.props.noteType == "D")
      apiUrl =
        "http://localhost:7021/users/" + this.state.userId + "/deleted-notes/";

    apiUrl += this.props.noteId;
    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonData) => this.setState({ noteData: jsonData }));
  }
  deleteNotes() {
    const response = fetch(
      "http://localhost:7021/users/" + this.state.userId + "/notes/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteId: this.state.noteId,
        }),
      }
    );
    console.log(response.status);
    if (
      response.status == 200 ||
      response.status == 201 ||
      response.status == 202 ||
      response.status == 204
    )
      this.props.history.push("/users/" + this.state.userId);
    else this.props.history.push("/");
  }
  render() {
    if (this.state.noteId == null) return <div></div>;
    return (
      <div class="mail-view d-none d-md-block col-md-9 col-lg-7 bg-white">
        <div class="row">
          <div class="col-md-12 mb-4 mt-4">
            <div class="btn-toolbar">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  onClick={this.deleteNotes}
                >
                  <i class="mdi mdi-reply text-primary mr-1"></i> Delete
                </button>
                {/* <button type="button" class="btn btn-sm btn-outline-secondary">
                  <i class="mdi mdi-reply-all text-primary mr-1"></i>Reply All
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  <i class="mdi mdi-share text-primary mr-1"></i>Forward
                </button> */}
              </div>
              {/* <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  <i class="mdi mdi-attachment text-primary mr-1"></i>Attach
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  <i class="mdi mdi-delete text-primary mr-1"></i>Delete
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div class="message-body">
          <div class="sender-details">
            {/* <img
              class="img-sm rounded-circle mr-3"
              src="http://www.urbanui.com/dashflat/template/images/faces/face11.jpg"
              alt=""
            /> */}
            <div class="details">
              <p class="msg-subject">{this.state.noteData.title}</p>
              {/* <p class="sender-email">
                Sarah Graves
                <a href="#">itsmesarah268@gmail.com</a>
                &nbsp;<i class="mdi mdi-account-multiple-plus"></i>
              </p> */}
            </div>
          </div>
          <div class="message-content">
            <p>{this.state.noteData.description}</p>
          </div>
          {/* <div class="attachments-sections">
            <ul>
              <li>
                <div class="thumb">
                  <i class="mdi mdi-file-pdf"></i>
                </div>
                <div class="details">
                  <p class="file-name">Seminar Reports.pdf</p>
                  <div class="buttons">
                    <p class="file-size">678Kb</p>
                    <a href="#" class="view">
                      View
                    </a>
                    <a href="#" class="download">
                      Download
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div class="thumb">
                  <i class="mdi mdi-file-image"></i>
                </div>
                <div class="details">
                  <p class="file-name">Product Design.jpg</p>
                  <div class="buttons">
                    <p class="file-size">1.96Mb</p>
                    <a href="#" class="view">
                      View
                    </a>
                    <a href="#" class="download">
                      Download
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    );
  }
}

export default NotesBody;
