import React, { Component } from "react";
import { connect } from "react-redux";

import { login } from "../store/actions/usersAction";
// import { fetchUsersAction } from "../store/actions/usersAction";
class UserAccount extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <h1> you are finish the registration </h1>{" "}
        {this.props.users.favorites &&
          this.props.users.favorites.map((favorite, index) => {
            return <h1 key={index}>{favorite}</h1>;
          })}
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
