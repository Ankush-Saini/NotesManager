import React from "react";
class UserCreation extends React.Component {
  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
  }
  addUser(e) {
    e.preventDefault();
    var userName = document.getElementsByName("userName")[0].value;
    const response = fetch("http://localhost:7021/users/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        userName: "" + userName + "",
      }),
    });
    if (response.status == 200 || response.status == 201)
      this.props.history.push("/");
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
        <form onSubmit={this.addUser}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="form-check-label">Username:</label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-check-input"
                    name="userName"
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td colspan="2">
                  <input type="Submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
export default UserCreation;
