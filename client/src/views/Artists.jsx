import React, { Component } from "react";
import { Link } from "react-router-dom";
// import artistModel from "../../../server/model/Artist";
// custom tools
import APIHandler from "../api/handler";

// styles
import "../styles/card.css";

export default class Artists extends Component {
  state = {
    artists: [],
  };

  componentDidMount() {
    APIHandler.get("/api/artists")
      .then(({ data }) => {
        this.setState({
          artists: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if (this.state.artists.length === 0) {
      return <p>No Artist yet!</p>;
    }
    return (
      <React.Fragment>
        <h1 className="title diy">Artists</h1>
        <ul className="cards">
          {this.state.artists.map((artist) => {
            return (
              <li className="card shadow-box" key={artist._id}>
                <div
                  className="color"
                  style={{ backgroundColor: artist.style.color }}
                ></div>
                <Link to={"/artists/" + artist._id} className="title">
                  {artist.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}
