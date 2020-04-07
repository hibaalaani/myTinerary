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

  componentDidMount() {
    this.props.register(userData);
    const userData = this.props.payload;
  }
  render() {
    return (
      <div className="container">
        <h1> you are finish the registration {this.payload.name}</h1>
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
