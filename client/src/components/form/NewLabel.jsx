import React, { Component } from "react";
import APIHandler from "./../../api/handler";

export default class NewLabel extends Component {
  state = {
    name: " ",
    city: " ",
    country: " ",
    street: " ",
    streetNb: " ",
    logo: " ",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIHandler.post("/api/labels", this.state);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form>
          <h1>create a new label</h1>
          <input
            name="name"
            type="text"
            placeholder="name"
            onChange={this.handleChange}
          />
          <input
            name="city"
            type="text"
            placeholder="city"
            onChange={this.handleChange}
          />
          <input
            name="country"
            type="text"
            placeholder="country"
            onChange={this.handleChange}
          />
          <input
            name="street"
            type="text"
            placeholder="street"
            onChange={this.handleChange}
          />
          <input
            name="streetNb"
            type="text"
            placeholder="streetNb"
            onChange={this.handleChange}
          />
          <input
            name="streetNb"
            type="text"
            placeholder="streetNb"
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>ok</button>
        </form>
      </div>
    );
  }
}
