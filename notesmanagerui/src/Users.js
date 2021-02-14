import React from "react";
import { Link } from "react-router-dom";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      isLoaded: false,
      isSwapped: false,
    };
  }
  loadUsers() {
    let apiUrl = "http://localhost:7021/users";

    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonData) =>
        this.setState({ userData: Object.values(jsonData), isLoaded: true })
      );
  }

  swap() {
    var rndimg = new Array("note1.jpg", "note2.jpg", "note3.jpg", "note4.jpg");
    var numimages = rndimg.length;
    var allUsers = document.getElementsByClassName("banner");
    for (var i = 0; i < allUsers.length; i++) {
      var x = Math.floor(Math.random() * numimages);
      var randomimage = rndimg[x];
      console.log(randomimage);
      allUsers.item(
        i
      ).style.background = `#ffffcc  url({process.env.PUBLIC_URL +./images/${randomimage}}) no-repeat center center`;
      console.log(allUsers.item(i));
    }
    if (!this.state.isSwapped) this.setState({ isSwapped: true });
  }
  componentDidMount() {
    this.loadUsers();
  }
  componentDidUpdate() {
    this.swap();
  }
  render() {
    if (!this.state.isLoaded) {
      return <div>loading Users...</div>;
    }

    return (
      <div id="user-container">
        <ul id="user-list">
          {this.state.userData.map((singleUser) => {
            return (
              <li>
                <Link
                  to={{
                    pathname: "/users/" + singleUser.userId,
                    state: {
                      userName: singleUser.userName,
                    },
                  }}
                  className="banner"
                >
                  {singleUser.userName}
                </Link>
              </li>
            );
          })}
          <li>
            <a href="/create-user" className="add-banner">
              +
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Users;
