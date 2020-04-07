import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import JwtDecode from "jwt-decode";
import login from "../store/actions/usersAction";
// import { fetchUsersAction } from "../store/actions/usersAction";
export class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: "",
    };
  }

  componentDidMount() {
    this.props.JwtDecode();
    // Axios.get("http://localhost:5000/api/users/", JwtDecode).then((res) => {
    //   console.log("response", res);
    // });
    // .then((result) => {
    //   console.log("result :", result);
    //   this.setState({ users: result });
    //   console.log("from landing page ", this.state.users);
    // });
  }
  render() {
    const user = this.state.users;
    return (
      <div className="container">
        <h1> you are finish the registration {user}</h1>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    user: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  JwtDecode: (user) => dispatch(JwtDecode(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
