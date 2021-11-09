import React, { Component } from "react";
import { Link } from "react-router-dom";
// custom tools
import APIHandler from "../api/handler";

// styles
import "../styles/card.css";
import "../styles/icon-favorite.css";

export default class Albums extends Component {
  state = {
    albums: [],
  };

  async componentDidMount() {
    const x = await APIHandler.get("/api/albums");
    this.setState({
      albums: x.data,
    });
  }

  render() {

    if(this.state.albums.length === 0){
      return <p>No albums yet!</p>
    }
    return (
      <React.Fragment>
        <h1 className="title">Albums</h1>
        <ul className="cards ">
          {this.state.albums.map((album) => {
            return (
              <li className="card shadow-box album" key={album._id}>
                <Link to={"/albums/" + album._id} className="title">
                  {album.title}
                </Link>
                <img className="cover" src={album.cover} alt={album.title} />
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}
