import React, { Component } from "react";
import { fetchCitiesAction, fetchAddCity } from "../store/actions/cityActions";
import { connect } from "react-redux";

class AddCity extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      country: null,
      picture: null,
    };
  }

  componentDidMount() {
    const city = this.props.cities;
    this.props.fetchCitiesAction(city);
  }

  handelChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    // retrieve token from local storage and send it to the add city action0DEFFF
    //where to write condition for user login?
    var token = localStorage.getItem("token");
    this.props.fetchAddCity(this.state.cities, token);

    console.log("submit", this.state);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handelSubmit}>
          <label className="mx-2" htmlFor="name">
            {" "}
            Name:
          </label>
          <input type="text" id="name" onChange={this.handelChange} />
          <label className="mx-2" htmlFor="country">
            {" "}
            Country
          </label>
          <input type="text" id="country" onChange={this.handelChange} />
          <label className="mx-2" htmlFor="picture">
            Picture:
          </label>
          <input type="url" id="picture" onChange={this.handelChange} />
          <button className="mx-2" type="submit">
            Add New City
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
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchAddCity: (city, token) => dispatch(fetchAddCity(city, token)),
  fetchCitiesAction: (city) => dispatch(fetchCitiesAction(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCity);
