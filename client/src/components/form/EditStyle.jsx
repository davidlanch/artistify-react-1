import React, { Component } from "react";
import APIHandler from "./../../api/handler";


export default class EditStyle extends Component {
  state = {
    name: " ",
    color: " ",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIHandler.patch("/api/styles/" + this.props.match.params.id + "/edit", this.state);
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
    
    console.log('params', this.props.match.params)
    return (
      <div>
        <form>
          <h1>Edit a  Style</h1>
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

