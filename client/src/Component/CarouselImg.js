import React, { Component } from "react";
import { Link } from "react-router-dom";
import InfiniteCarousel from "react-leaf-carousel";
export default class CarouselImg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cities = this.props.cities;
    console.log('cities', cities)
    return (
      <div>
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }
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
              <Link to={"/" + city.name}>

                <div key={city.id}>
                  <img
                    className="imgCarsoul rounded  d-block w-100"
                    // style={style.img}
                    src={city.picture}
                    alt=""
                  />

                  <p className="p-4 mt-4 card-title">{city.name}</p>
                </div>
              </Link>
            );
          })}
        </InfiniteCarousel>
      </div>
    );
  }
}
