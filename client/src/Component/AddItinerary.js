import React, { Component } from "react";
import { fetchNewItinerary } from "../store/actions/itineraryActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class AddItinerary extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      profile: null,
      activities: [],
      hashtags: [],
      price: null,
      duration: null,
      rating: null,
    };
  }

  handelChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    if (!this.props.user.isLoggedin) {
      alert(" you need to login");
      return <Redirect to="/Login" />;
    } else if (
      this.state.name === "" ||
      this.state.profile === "" ||
      this.state.activities === ""
    ) {
      alert("You need to  fill these fields");
    } else {
      const newitinerary = {
        name: this.state.name,
        profile: this.state.profile,
        rating: this.state.rating,
        hashtags: this.state.hashtags,
        activities: this.state.activities,
        duration: this.state.duration,
        price: this.state.price,
      };
      // retrieve token from local storage and send it to the add city action
      //where to write condition for user login?
      var token = localStorage.getItem("token");
      this.props.fetchNewItinerary(newitinerary, token);
      console.log("itinerary", newitinerary, token);
    }
  };
  render() {
    return (
      <div
        className="card p-2 card-itinerary-add border-info"
        style={{ width: "18rem" }}
      >
        <form onSubmit={this.handelSubmit}>
          <label className="mx-2" htmlFor="name">
            {" "}
            Name:
          </label>
          <input type="text" id="name" onChange={this.handelChange} />
          <label className="mx-2" htmlFor="profile">
            {" "}
            profile
          </label>
          <input type="url" id="profile" onChange={this.handelChange} />
          <label className="mx-2" htmlFor="duration">
            duration:
          </label>
          <input type="text" id="duration" onChange={this.handelChange} />
          <label className="mx-2" htmlFor="rating">
            rating:
          </label>
          <input type="text" id="rating" onChange={this.handelChange} />
          <label className="mx-2" htmlFor="activities">
            activites:
          </label>
          <input type="text" id="activites" onChange={this.handelChange} />
          <label className="mx-2" htmlFor="hashtags">
            hashtags:
          </label>
          <input type="text" id="hashtags" onChange={this.handelChange} />
          <label className="mx-2 " htmlFor="price">
            price:
          </label>
          <input type="text" id="price" onChange={this.handelChange} />
          <button className="mx-2 btn-info" type="submit">
            Add New Itinerary
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    cities: state.cities.cities,
    user: state.users,
    itineraries: state.itineraries.itineraries,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchNewItinerary: (newitinerary, token) =>
    dispatch(fetchNewItinerary(newitinerary, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItinerary);
