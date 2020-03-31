import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../store/actions/usersAction";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handelChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handelSubmit = e => {
    e.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      return alert("you need to fill both field");
    } else {
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      console.log(userData);
      this.props.login(userData);
    }
    // this.setState({
    //   email: "",
    //   password: ""
    // });
  };
  render() {
    console.log("this.props :", this.props);
    return (
      <div className="container">
        {/* i didint understand this part   ////////////////////////// */}
        {this.props.user.isLoggedin ? (
          <p>{this.props.user.token}</p>
        ) : (
          <form className="form-group" onSubmit={this.handelSubmit}>
            <h5 className="card-title">Sign In</h5>
            <div className="row block">
              <div className="col-md-4">
                <label htmlFor="email">email</label>
                <input type="email" id="email" onChange={this.handelChange} />
              </div>
              <div class="col-md-4">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  id="password"
                  onChange={this.handelChange}
                />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <button>login</button>
                </div>
              </div>
            </div>
          </form>
        )}
        {/* <Link to="/google"> */}
        <button
          className="btn btn-primary"
          href="http://localhost:5000/api/users/auth/google"
        >
          Login In With Google
        </button>
        {/* </Link> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("mamToState", state);
  return {
    user: state.users
  };
};
const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(login(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
