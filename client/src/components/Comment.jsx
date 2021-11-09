import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    console.log("HEEERE hehehe");
    return (
      <div className="comments">
        <h1 className="title">express y@self</h1>
        <form action="" className="form">
          <input
            type="text"
            className="input"
            placeholder="leave a comment here .."
          />
          <button className="btn"> send !</button>
        </form>
      </div>
    );
  }
}
