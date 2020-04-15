import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import JwtDecode from "jwt-decode";
import { login } from "../store/actions/usersAction";
// import { fetchUsersAction } from "../store/actions/usersAction";
export class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: "",
    };
  }

  render() {
    const userData = this.props.user;
    return (
      <div className="container">
        <h1> you are finish the registration </h1>{" "}
        {this.props.user.isLoggedin ? (
          <p> Hello {this.props.user.users}</p>
        ) : (
          this.state.user
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    user: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
