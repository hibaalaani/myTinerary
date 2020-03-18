const initialState = {
  cities: ["city1", "city2"]
};

function citiesReducer(state = initialState, action) {
  console.log("city action", action);
  switch (action.type) {
    case "FETCH-CITY": //to do
      console.log("created city", action.city);
      return { ...state, initialState: action.city };
      return state;
    case "CREATE_ERROR":
      console.log("err ", action.err);
      return state;
    default:
      return state;
  }
}
export default citiesReducer;
