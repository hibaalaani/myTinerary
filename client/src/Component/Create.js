import React, { Component } from "react";

export default class Create extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    laastName: ""
  };
  handelChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handelSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div className="container">
        <h5 className="card-title">Sign Up</h5>
        <form className="form-group" onSubmit={this.handelSubmit}>
          <div className="row block">
            <div className="col-md-4">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={this.handelChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" onChange={this.handelChange} />
            </div>
          </div>
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
          </div>
          <div className="col-md-4">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}
