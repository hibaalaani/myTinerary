import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProfileFavorites } from "../store/actions/itineraryActions";
import { login } from "../store/actions/usersAction";
// import { fetchUsersAction } from "../store/actions/usersAction";
class UserAccount extends Component {
  // profileFavorites = () => {
  //   const ids = this.props.users.favorites;
  //   console.log("ids", ids);
  //   this.props.fetchProfileFavorites(ids);
  // };
  componentDidMount() {
    const ids = this.props.users.favorites;
    console.log("ids", ids);
    // const ids =this.props.itineraries.favorites.includes(this.props.users.email)
    this.props.fetchProfileFavorites(ids);
  }

  render() {
    const itineraries = this.props.itineraries.favoriteitineraries;
    console.log("itineraries", itineraries);
    const users = this.props.users;
    console.log("from userAccount", this.props.users);
    return (
      <div className="container">
        {/* {users.isLoggedin && itineraries.includes(users.favorites) ? (
          <img src={itineraries.profile} />
        ) : (
          <h4>You Have No Liked Itinerary</h4>
        )} */}
        {/* {this.props.itineraries.includes(users.email) ? (
          <img src={itineraries.profile} />
        ) : (
          <h4>you have no favorite itinerary</h4>
        )} */}
        {itineraries &&
          itineraries.map((itinerary, index) => (
            <div key={index} itinerary={itinerary}>
              <div>
                <img src={itinerary.profile} alt="" />
              </div>{" "}
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("state", state);
  return {
    users: state.users,
    itineraries: state.itineraries,
  };
};
const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
  fetchProfileFavorites: (ids) => dispatch(fetchProfileFavorites(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
