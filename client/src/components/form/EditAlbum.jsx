import React, { Component } from 'react';
import APIHandler from "./../../api/handler";

export default class Album extends Component {

  constructor(props) {
    super(props); 
    this.state = {
        title: "",
        releaseDate: "",
        artist: "Unknown",
        cover: React.createRef(),
        description: "",
        label: "Unknown",
        artists: [],
        labels: []
        }
  };

  componentDidMount = async () => {
      try {
        const albumInfo = await APIHandler.get("/api/albums/" + this.props.match.params.id);
        const responseArtists = await APIHandler.get("/api/artists");
        const responseLabels = await APIHandler.get("/api/labels");
        this.setState({
            title: albumInfo.data.title,
            description: albumInfo.data.description,
            artists: responseArtists.data,
            labels: responseLabels.data,
            releaseDate: albumInfo.data.releaseDate.slice(0,10),
            artist: albumInfo.data.artist._id,
            label: albumInfo.data.label._id
        })
        } catch (error) {console.error(error)}
  }

  handleSubmit = async (evt) => {
    evt.preventDefault(); 
    const { title, releaseDate, artist, description, label } = this.state;
    const file = this.state.cover.current.files[0]; 

    const uploadData = new FormData(); 

    // appending the keys / values pairs to the FormData
    uploadData.append("title", title); 
    uploadData.append("releaseDate", releaseDate); 
    uploadData.append("cover", file);
    uploadData.append("artist", artist); 
    uploadData.append("description", description);
    uploadData.append("label", label); 

    try {
      await APIHandler.patch("/api/albums/" + this.props.match.params.id + "/edit", uploadData); 
      this.props.history.push("/admin/albums")
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  render () {
    return (
    <>
    <h2>Edit this album</h2>

      <form className="form">

        <label className="label" htmlFor="title">
              Title
        </label>
        <input
          className="input"
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <label className="label" value={this.state.releaseDate} htmlFor="releaseDate">
              Release date
        </label>
        <input
          className="input"
          name="releaseDate"
          type="date"
          value={this.state.releaseDate}
          onChange={this.handleChange}
        />

        <label className="label" htmlFor="artist">
              Artist
        </label>
        <select name="artist" onChange={this.handleChange}>
            {
                this.state.artists.map((artist) => {
                    return <option key={artist._id} value={artist._id}>{artist.name}</option>
                })
            }
        </select>

        <label className="label" htmlFor="description">
              Description
        </label>
        <input
          className="input"
          name="description"
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <label className="label" htmlFor="cover">
              Cover image
        </label>
        <input className="input" ref={this.state.cover} name="cover" type="file" />

        <label className="label" htmlFor="label">
              Label
        </label>
        <select name="label" onChange={this.handleChange} placeholder="label">
            {
                this.state.labels.map((label) => {
                    return <option key={label._id} value={label._id}>{label.name}</option>
                })
            }
        </select>

        <button className="btn" onClick={this.handleSubmit}>ok</button>
     
      </form>
      </>
    );
    }
}