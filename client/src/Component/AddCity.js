import React, { Component } from "react";
import { fetchCitiesAction } from "../store/actions/cityActions";
import { connect } from "react-redux";

class AddCity extends Component {
  constructor(props) {
    super();
    this.state = {
      name: null,
      country: null,
      picture: null
    };
  }
  handelChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handelSubmit = e => {
    e.preventDefault();
    console.log(e);
    this.props.fetchCitiesAction(this.state.cities);
  };
  render() {
    const cities = this.props.fetchCitiesAction;
    console.log(cities);
    console.log("cities from addCity", cities);
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
const mapDispatchToParops = dispatch => {
  return {
    fetchCitiesAction: city => dispatch(fetchCitiesAction(city))
  };
};
const mapStateToProps = (state, ownProps) => {
  console.log(state);

  return {
    cities: state.cities.cities
  };
};
export default connect(mapStateToProps, mapDispatchToParops)(AddCity);
