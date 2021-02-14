import React from "react";
class NotesCreation extends React.Component {
  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
  }
  addUser(e) {
    e.preventDefault();
    var title = document.getElementsByName("title")[0].value;
    var description = document.querySelector('textarea[name="description"]')
      .value;
    const response = fetch(
      "http://localhost:7021/users/" +
        this.props.match.params.userId +
        "/notes/",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          title: "" + title + "",
          description: "" + description + "",
        }),
      }
    );
    if (response.status == 200 || response.status == 201)
      this.props.history.push("/users/" + this.props.match.params.userId);
    else this.props.history.push("/");
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <form onSubmit={this.addUser} id="noteForm">
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="form-check-label">Title:</label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-check-input"
                    name="title"
                    style={{ width: "375px" }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="form-check-label">Description:</label>
                </td>
                <td>
                  <textarea
                    className="form-check-input"
                    name="description"
                    rows="5"
                    cols="50"
                    form="noteForm"
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td colspan="2">
                  <input type="Submit" value="Save" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
export default NotesCreation;
