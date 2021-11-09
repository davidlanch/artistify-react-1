import React, { Component } from "react";
import APIHandler from "../../api/handler";

export default class NewArtist extends Component {
  // using the constructor form to associate a ref
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
    APIHandler.get("/api/styles")
      .then(({ data }) => {
        this.setState({
         style: data[0]._id,
          styles: data,
          isBand: true
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault(); // prevent the form to reload
    // destructuring the state
    const { name, style, description, isBand } = this.state;
    console.log("STATE", this.state)
    // const uploadData = new FormData(); // create a form data => an object to send as post body

    // appending the keys / values pairs to the FormData
    // uploadData.append("name", name); // create a key [name] on the formDate
    // uploadData.append("style", style); // create a key [age] on the formDate
    // uploadData.append("description", description); // create a key [color] on the formDate
    // uploadData.append("isBand", isBand);
    // console.log("DATA", uploadData)

    try {
      await APIHandler.post("/api/artists/create", { name, style, description, isBand } ); // sending the formData
      //   this.props.handler(); // passing the ball to the parent's callback
      this.props.history.push("/admin/artists")
    } catch (err) {
      console.error(err);
      console.log("no")
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {

    if (this.state.styles.length === 0) {
      return <p>loading</p>;
    }
    return (
      <form className="form">
        <h1 className="title diy">create a new artist</h1>
        <div className="row justify-start">
          <label htmlFor="name" className="label">
            name
          </label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            className="input"
          />
        </div>
        <div className="row justify-start">
          <label htmlFor="style" className="label">
            style
          </label>

          <select
            name="style"
            value={this.state.style}
            onChange={this.handleChange}
            className="input"
          >
            {this.state.styles.map((style) => {
              return <option value={style._id}>{style.name}</option>;
            })}
          </select>
        </div>
        <div className="row justify-start">
          <label htmlFor="description" className="label">
            description
          </label>
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
            className="input"
          />
        </div>
        <div className="row justify-start">
          <label htmlFor="isBand" className="label">
            is it a Band ?
          </label>
          <select
            name="isBand"
            type="text"
            value={this.state.isBand}
            onChange={this.handleChange}
            className="input"
          >
            <option value= {true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <button className="btn" onClick={this.handleSubmit}>
          ok
        </button>
      </form>
    );
  }
}
