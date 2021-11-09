import React, { Component } from "react";
import APIHandler from "./../../api/handler";


export default class NewLabel extends Component {
  state = {
    name: " ",
    // wikiURL: " ",
    color: " ",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIHandler.post("/api/styles", this.state);
      console.log(res.data);
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
          <h1>create a new Style</h1>
          <input
            name="name"
            type="text"
            placeholder="name"
            onChange={this.handleChange}
          />
          <input
            name="color"
            type="text"
            placeholder="color"
            onChange={this.handleChange}
          />
          
          <button onClick={this.handleSubmit}>ok</button>
        </form>
      </div>
    );
  }
}
