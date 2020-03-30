import React, { Component } from "react";

export default class Login extends Component {
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
    }
    this.setState({
      email: "",
      password: ""
    });
  };
  render() {
    return (
      <div className="container">
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
      </div>
    );
  }
}
