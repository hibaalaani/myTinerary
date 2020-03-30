import React, { Component } from "react";
import { fetchUsersAction } from "../store/actions/usersAction";
export class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ""
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/api/users/")
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log("result :", result);
        this.setState({ users: result });
        console.log("from landing page ", this.state.users);
      });
  }
  render() {
    const user = this.state.user;

    return (
      <div className="container">
        <h1> you are finish the registration {user}</h1>
      </div>
    );
  }
}

export default UserAccount;
