import React, { Component } from "react";

export default class UserFavoriteItinerary extends Component {
  componentDidMount() {
    this.props.user.favorite;
  }

  render() {
    return (
      <div>
        <h1>your Favorite Itinerary</h1>
        {this.props.user.favorite}
      </div>
    );
  }
}
