import React, { Component } from "react";
import InfiniteCarousel from "react-leaf-carousel";
// import { fitchItinerariesAction } from "../store/actions/itineraryActions";
export default class CarouselImg extends Component {
  render() {
    const cities = this.props.cities;
    return (
      <div>
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
          dots={true}
          showSides={true}
          sidesOpacity={0.5}
          sideSize={0.1}
          slidesToScroll={4}
          slidesToShow={4}
          scrollOnDevice={true}
        >
          {cities.map((city, index) => {
            return (
              // <Link to={"/" + city.name}>
              <div key={index}>
                <img
                  className="imgCarsoul rounded card d-block w-100"
                  //style={style.img}
                  src={city.picture}
                  alt="city"
                />

                <p className="p-4 mt-4 card-title">{city.name}</p>
              </div>
              // </Link>
            );
          })}
        </InfiniteCarousel>
      </div>
    );
  }
}
