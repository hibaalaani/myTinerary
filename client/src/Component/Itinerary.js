import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItinerariesByCityName } from "../store/actions/itineraryActions";
class Itinerary extends Component {
  constructor() {
    super();
    this.state = {
      itineraries: []
    };
  }
  componentDidMount() {
    const city = this.props.match.params.city;

    this.props.fetchItinerariesByCityName(city);
  }

  filter() {
    if (this.props.itineraries) {
      const filterItinerary = this.props.itineraries.filter(
        (itinerary, index) => {
          return itinerary.profile;
        }
      );
      return filterItinerary;
    } else {
      return [];
    }
  }
  render() {
    const filterList = this.filter();
    const { itineraries } = this.props;
    return (
      <div>
        <h1>Our Itineraries</h1>
        {filterList &&
          filterList.map((itinerary, index) => (
            <div
              className="container  itinerary"
              key={index}
              itinerary={itinerary}
            >
              {/* <div> */}
              <h3 className="card-title pt-3 text-light">
                Activities in {itinerary.name} : {itinerary.activities}
              </h3>
              <img
                className="card-body  align-center"
                src={itinerary.profile}
              />
              <div className="text-light pb-3">
                <h4>
                  The Price for {itinerary.duration} With Hotels{" "}
                  {itinerary.price}
                </h4>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    itineraries: state.itineraries.itineraries
  };
};
const mapDispatchToProps = dispatch => ({
  fetchItinerariesByCityName: city => dispatch(fetchItinerariesByCityName(city))
});
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
