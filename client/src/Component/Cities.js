import React, { Component } from "react";

export default class Cities extends Component {
  constructor() {
    super();
    this.state = {
      cities: []
    };
  }

  componentDidMount() {
    fetch("https://mern-ubiqum-v2.herokuapp.com/cities/all")
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log("result :", result);
        this.setState({ cities: result });
        // console.log(cities);
      });
  }
  cutArray() {
    return this.state.cities.map((city, index) => {
      return index < 15;
      console.log(city);
      console.log(city);
    });
  }

  render() {
    // const filterList = this.cutArray();

    return (
      <div>
        {/* {filterList.map((img, index) => {
          return (
            <div key={index}>
              <cities />
            </div>
          );
        })} */}
      </div>
    );
  }
}
