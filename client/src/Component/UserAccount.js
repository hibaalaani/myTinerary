import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import JwtDecode from "jwt-decode";
import { login } from "../store/actions/usersAction";
import UserFavoriteItinerary from "./UserFavoriteItinerary";
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
            return <h1>{favorite}</h1>;
          })}
        <UserFavoriteItinerary />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {

  return {
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
