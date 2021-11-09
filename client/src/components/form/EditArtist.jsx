import React, { Component } from "react";
import APIHandler from "../../api/handler";

export default class EditArtist extends Component {
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
    const id = this.props.match.params.id
    console.log(id)
      APIHandler.get("/api/artists/" + id)
      .then((res) => {
          console.log("REEES", res)
        const { name, style, description, isBand } = res.data;
        this.setState({
            name,
            style: res.data.style._id,
            description,
            isBand
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault(); // prevent the form to reload

    const { name, style, description, isBand } = this.state;

    try {
        const id = this.props.match.params.id
      await APIHandler.patch("/api/artists/" + id, this.state );
      this.props.history.push("/admin/artists")
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
    if ( this.state.name === "") {
      return <p>loading</p>;
      
    }
    console.log("HOLAA",this.state.style)
    return (
      <form className="form">
        <h1 className="title diy">Update the artist</h1>
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
              return <option value={style._id}>{style.name} </option>;
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
