import React, { Component } from "react";
import { connect } from "react-redux";
import { fitchItinerariesAction } from "../store/actions/itineraryActions";
class Itinerary extends Component {
  constructor() {
    super();
    this.state = {
      itineraries: []
    };
  }
  componentDidMount() {
    this.props.fitchItinerariesAction();
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
            <div key={index} itinerary={itinerary}>
              {/* <div> */}
              {/* <h3 className="card-title bg-primary">{itinerary.activities}</h3> */}
              <img className="card col-md-4" src={itinerary.profile} />
              {/* </div> */}
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
  fitchItinerariesAction: itinerary =>
    dispatch(fitchItinerariesAction(itinerary))
});
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
