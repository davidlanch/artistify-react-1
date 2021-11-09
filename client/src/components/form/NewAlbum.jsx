import React, { Component } from 'react';
import APIHandler from "./../../api/handler";

// Il faudra faire un menu déroulant pour l'artiste et le label (à envoyer depuis le backend du coup)
// et un cloudinary pour l'image
// et un truc pour la date ?? :(
// gaffe aussi à la syntaxe des select si ça marche pas

export default class NewAlbum extends Component {

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
        const responseArtists = await APIHandler.get("/api/artists");
        const responseLabels = await APIHandler.get("/api/labels");
        this.setState({
            artists: responseArtists.data,
            labels: responseLabels.data,
            artist: responseArtists.data[0]._id,
            label: responseLabels.data[0]._id
        })
        } catch (error) {console.error(error)}
  }

  handleSubmit = async (evt) => {
    evt.preventDefault(); 
    const { title, releaseDate, artist, description, label } = this.state;
    const file = this.state.cover.current.files[0]; 

    const uploadData = new FormData(); // create a form data => an object to send as post body

    // appending the keys / values pairs to the FormData
    uploadData.append("title", title); 
    uploadData.append("releaseDate", releaseDate); 
    uploadData.append("cover", file);
    uploadData.append("artist", artist); 
    uploadData.append("description", description);
    uploadData.append("label", label); 

    try {
      await APIHandler.post("/api/albums/create", uploadData); 
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
    <h2>Create a new album</h2>

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

        <label className="label" htmlFor="releaseDate">
              Release date
        </label>
        <input
          className="input"
          name="releaseDate"
          type="date"
          placeholder="releaseDate"
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