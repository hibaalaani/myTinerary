const initialState = {
  itineraries: [],
  err: ""
};

//you had some issues acting the payload to pass data from your action to your reducer
//I changed a bit the naming too so it makes more sense
function itineraryReducer(state = initialState, action) {
  console.log("city action", action);
  switch (action.type) {
    case "FETCH_ITINERARIES_SUCCESS":
      console.log("FETCH_ITINERARIES_SUCCESS", action);
      return { ...state, itineraries: action.payload, err: "" };
      return state;
    case "FETCH_ITINERARIES_ERROR":
      console.log("FETCH_ITINERARIES_ERROR", action);
      return { ...state, err: action.payload };
    default:
      return state;
  }
}
export default itineraryReducer;
