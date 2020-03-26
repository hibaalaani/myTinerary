const initialState = {
  users: [],
  err: ""
};

//you had some issues acting the payload to pass data from your action to your reducer
//I changed a bit the naming too so it makes more sense
function usersReducers(state = initialState, action) {
  console.log("city action", action);
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      console.log("FETCH_USERS_SUCCESS", action);
      return { ...state, users: action.payload, err: "" };
      return state;
    case "FETCH_USERS_ERROR":
      console.log("FETCH_ITINERARIES_ERROR", action);
      return { ...state, err: action.payload };
    default:
      return state;
  }
}
export default usersReducers;
