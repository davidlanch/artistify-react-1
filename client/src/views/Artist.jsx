// custom tools
import React, { Component } from "react";
import APIHandler from "../api/handler";
import LabPreview from "../components/preview/LabPreview";
import Comment from "../components/Comment";
// styles
import "./../styles/artist.css";
import "./../styles/comment.css";
import "./../styles/star.css";

export default class Artists extends Component {
  // console.log(props.match.params.id)
  constructor(props) {
    super(props); // MANDATORY !!!!
    this.state = {
      name: "",
      style: null,
      description: "",
      isBand: "",
      styles: [],
    };
  }

  componentDidMount() {
      APIHandler.get("/api/artists/" + this.props.match.params.id)
      .then((res) => {
          console.log("REEES", res)
        const { name, style, description, isBand } = res.data;
        this.setState({
            name,
            style: res.data.style.name,
            description,
            isBand
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    console.log("REQ USER", this.props)
    if ( this.state.name === "") {
      return <p>loading</p>;
      
    }
    return (
    <>
      <h1 className="title">{this.state.name}</h1>
      <p>
      music style: {this.state.style}<br/>
      {this.state.description}
      </p>

      <h1 className="title diy">D.I.Y (Stars)</h1>
      <p>
        The Stars component allow the end-users to rate an artist/album.
        <br />
        The black stars represent the average rate for a given resource.
        <br />
        The yellow stars represent the logged in user rate.
        <br />
        Bonus: make it modular to rate labels/styles as well.
      </p>

      <hr />

      <h1 className="title diy">D.I.Y (Discography)</h1>
      <p>
        Code a Discography component displaying all the albums related to the
        current artist if any, <br />else display the appropriate message.
        <br />
      </p>
      <hr />

      <h1 className="title diy">D.I.Y (Comments)</h1>
      <p>
        Import a custom {`<Comments />`} allowing the end-users to post comments
        related to the current artist.
        <br />
      </p>

      <LabPreview name="artist"/>
      <Comment idArtist={this.props.match.params.id} category="artist" />
      

     
    </>
  );
}
}
