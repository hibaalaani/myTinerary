import React, { Component } from "react";
import { connect } from "react-redux";

import { login } from "../store/actions/usersAction";
// import { fetchUsersAction } from "../store/actions/usersAction";
class UserAccount extends Component {
  render() {
    const users = this.props.users;
    console.log("from userAccount", this.props.users);
    return (
      <div className="container">
        {/* {users.favorites &&
          users.favorites.map((favorite, index) => {
            console.log(favorite);
            return <h1 key={index}>{favorite}</h1>;
          })} */}
        {users.favorites ? (
          <p>{users.favorites}</p>
        ) : (
          <h1>you have no favorite</h1>
        )}
        {/* <UserFavoriteItinerary /> */}
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
