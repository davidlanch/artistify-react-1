import React, { Component } from "react";
import APIHandler from "../api/handler";

export default class Comment extends Component {
state = {
    message: "",
    category: this.props.category,
    date : Date.now(),
    artist : this.props.idArtist || null,
    album : this.props.idAlbum || null,
    label : this.props.idLabel || null,
    style : this.props.idStyle || null,
    comments : []

}

async componentDidMount ()  {
    try {
        const response = await APIHandler.get("/api/comments/" + this.state.category + "/" + this.state[this.state.category], this.state );
        this.setState( {
            comments : response.data
        })
      } catch (err) {
        console.error(err);
      }
}


handleChange = (e) => {
this.setState({
    message: e.target.value
})
}

handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OUR STATE", this.state)
    try {
      await APIHandler.post("/api/comments/" + this.state.category + "/" + this.state[this.state.category], this.state );
    } catch (err) {
      console.error(err);
    }

}

  render() {
    console.log("HEEERE hehehe");
    console.log("comments", this.state.comments)
    return (
      <div className="comments">
        <h1 className="title">express y@self</h1>
        <form action="" className="form">
          <input
            type="text"
            className="input"
            placeholder="leave a comment here .."
            onChange= {this.handleChange}
          />
          <button className="btn" onClick = {this.handleSubmit}> send !</button>
        </form>

        {this.state.comments.map((comment, i) => {
            return (
                <div>{comment.message} by {comment.author}</div>
            )
        })}
      </div>
    );
  }
}
