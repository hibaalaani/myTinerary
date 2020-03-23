import React, { Component } from "react";
import { Card, CardGroup } from "reactstrap";
import { connect } from "react-redux";
import { fetchCitiesAction } from "../store/actions/cityActions";
// import AddCity from "./AddCity";
import { Link } from "react-router-dom";


class Cities extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      search: ""
    };
  }

  componentDidMount() {
    this.props.fetchCitiesAction();
  }
  cutArray() {
    return this.props.cities.map((city, index) => {
      return index < 15;
    });
  }
  handleChange = e => {
    console.log("event from handel change", e.target.value);
    this.setState({
      search: e.target.value
    });
  };
  filter() {
    if (this.props.cities) {
      const filterCity = this.props.cities.filter((city, index) => {
        console.log(" our cities  " + city.name);
        console.log("our search " + this.state.search);
        let cityName = city.name.toLowerCase();
        return cityName.startsWith(this.state.search.toLowerCase());
      });
      console.log(filterCity);
      return filterCity;
    } else return [];
  }
  // addNinja = city => {
  //   // city.id = Math.random();
  //   let cities = [...this.state.cities, city];
  //   this.setState({
  //     cities: cities
  //   });
  // };
  render() {
    const filterList = this.filter();
    const { cities } = this.props;
    console.log("this.props", this.props.cities);
    console.log("cities from citues", cities);
    return (
      <div>
        <label htmlFor="filter">Filter by City: </label>
        <input
          className=""
          type="search"
          id="filter"
          value={this.state.search}
          onChange={this.handleChange}
        />

        {filterList &&
          filterList.map((city, index) => (
            <Link to={"itineraries/" + city.name}>

              <div key={index} city={city}>
                {/* <div> */}
                <img className="card col-md-4" src={city.picture} />
                {/* </div> */}
              </div>
            </Link>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    cities: state.cities.cities
  };
};
const mapDispatchToProps = dispatch => ({
  fetchCitiesAction: city => dispatch(fetchCitiesAction(city))
});
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
