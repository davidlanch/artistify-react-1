import React, { Component } from "react";
import APIHandler from "../api/handler";

export default class Comment extends Component {
  state = {
    message: "",
    category: this.props.category,
    date: Date.now(),
    artist: this.props.idArtist || null,
    album: this.props.idAlbum || null,
    label: this.props.idLabel || null,
    style: this.props.idStyle || null,
    comments: [],
    didMount: false,
  };

  async componentDidMount() {
    this.updateComments();
  }

  updateComments = async () => {
    try {
      console.log(
        "lien",
        "/api/comments/" +
          this.state.category +
          "/" +
          this.state[this.state.category],
        this.state
      );
      const response = await APIHandler.get(
        "/api/comments/" +
          this.state.category +
          "/" +
          this.state[this.state.category]
      );
      console.log("RESPONSE", response);
      this.setState({
        comments: response.data,
        didMount: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OUR STATE", this.state);
    try {
      await APIHandler.post(
        "/api/comments/" +
          this.state.category +
          "/" +
          this.state[this.state.category],
        this.state
      );
      this.updateComments();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (!this.state.didMount) return <div>loading</div>;
    console.log("COMMENTS", this.state.comments);
    return (
      <div className="comments">
        <div className="header">
          <h1 className="title">express y@self</h1>
          <form action="" className="form">
            <input
              type="text"
              className="input"
              placeholder="leave a comment here .."
              onChange={this.handleChange}
            />
            <button className="btn" onClick={this.handleSubmit}>
              send !
            </button>
          </form>
        </div>

        {!this.state.comments.length ? (
          <div className="comment"> no comments yet </div>
        ) : (
          this.state.comments.map((comment, i) => {
            return (
              <div className="comment" key={i}>
              <div className="date">{comment.date.slice(0, 10)} {comment.date.slice(11, 19)}{" "}</div>
                <div className="author-infos">
                <img className="avatar" src="" alt="" />
                <b>{comment.author}</b></div>
                <div className="message">
        
                  {comment.message}
                </div>
                
              </div>
            );
          })
        )}
      </div>
    );
  }
}
