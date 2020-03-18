export const FITCH_CITY = "FITCH_CITY";
export const fetchCitiesAction = city => {
  return dispatch => {
    dispatch({ type: "FETCH-CITY", city });

    fetch("/cities")
      .then(resp => {
        return (city = resp.json());
      })
      .then(json => {
        dispatch({ type: "FETCH-CITY", city });
      })

      .catch(err => {
        dispatch({ type: "CREATE_ERROR", err });
      });
    //       .then(handleErrors)

    //       .then(res => res.json())
    //       .then(json => {
    //         dispatch(fetchCitiesSuccess(json.cities));
    //         return json.cities;
    //       })

    //       .catch(error => dispatch(fetchCitiesFailure(error)));
  };
  //   fetch("http://localhost:5000/api/cities/all")
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(result => {
  //       console.log("result :", result);
  //       this.setState({ cities: result });
  //       console.log(this.state.cities);
  //     });

  console.log("action");
};
