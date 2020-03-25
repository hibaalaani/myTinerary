// I cleaned a bit your action, I was almost good, just a few probem with the .json() convertion and handeling the payload
//it shuld work now ;)
export const fitchItinerariesAction = () => {
  return dispatch => {
    //add the full url of your back end
    fetch("http://localhost:5000/api/itineraries")
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        dispatch({ type: "FETCH_ITINERARIES_SUCCESS", payload: json });
      })
      .catch(err => {
        dispatch({ type: "FETCH_ITINERARIES_ERROR", payload: err });
      });
  };
};
export const fetchItinerariesByCityName = city => {
  return dispatch => {
    fetch("http://localhost:5000/api/itineraries/" + city)
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        dispatch({ type: "FETCH_ITINERARIES_SUCCESS", payload: json });
      })
      .catch(err => {
        dispatch({ type: "FETCH_ITINERARIES_ERROR", payload: err });
      });
  };
};
