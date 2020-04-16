import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import JwtDecode from "jwt-decode";
import { login } from "../store/actions/usersAction";
// import { fetchUsersAction } from "../store/actions/usersAction";
class UserAccount extends Component {
  render() {
    const userData = this.props.users;
    console.log(this.props);
    return (
      <div className="container">
        <h1> you are finish the registration </h1>{" "}
        {this.props.users.favorites &&
          this.props.users.favorites.map((favorite) => {
            return <h1>{favorite.name}</h1>;
          })}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
