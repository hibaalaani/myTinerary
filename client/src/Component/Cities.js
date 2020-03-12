import React, { Component } from "react";
import { Card, CardGroup } from "reactstrap";
export default class Cities extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      search: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/cities/all")
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log("result :", result);
        this.setState({ cities: result });
        console.log(this.state.cities);
      });
  }
  cutArray() {
    return this.state.cities.map((city, index) => {
      return index < 15;
    });
  }
  handleChange = e => {
    console.log("event from handel change", e.target);
    this.setState({
      search: e.target.value
    });
  };
  filter() {
    if (this.state.cities) {
      const filterCity = this.state.cities.filter((city, index) => {
        console.log(" our cities" + city.name);
        console.log("our search" + this.state.search);
        let cityName = city.name.toLowerCase();
        return cityName.startsWith(this.state.search.toLowerCase());
      });
      console.log(filterCity);
      return filterCity;
    } else return [];
  }

  render() {
    const filterList = this.filter();
    const city = this.state.cities;
    return (
      <div>
        <label htmlFor="filter">Filter by City: </label>
        <input
          type="search"
          id="filter"
          value={this.state.search}
          onChange={this.handleChange}
        />

        {filterList &&
          filterList.map((city, index) => (
            <div key={index} cities={city}>
              {/* <div> */}
              <img className="card col-md-4" src={city.picture} />
              {/* </div> */}
            </div>
          ))}
      </div>
    );
  }
}
