import React, { Component } from "react";
import APIHandler from "../../api/handler";
import { Link } from "react-router-dom";


export default class StylesTable extends Component {
  state = {
    elements: [],
  };

  fetch = () => {
    APIHandler.get("api/styles")
      .then((response) => {
        this.setState({
          elements: response.data,
          
        });
        console.log(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    console.log(this.props)
this.fetch()
  }

  handleDelete = (id) => {
    APIHandler.delete(`api/styles/${id}`)
    .then((response) => {
    this.fetch()
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    console.log("STATE: ", this.state.elements);
    if (!this.state.elements) return <div className="loading">Loading...</div>;
    return (
      <>
        <h1 className="title medium">Admin Styles<Link to="/admin/styles/create">+</Link></h1>
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>color</th>
              <th>edit</th>
              <th>trash</th>
            </tr>
          </thead>
          <tbody>
            {this.state.elements.map((element) => {
              return (
                <tr>
                  <td> {element.name}</td>
                  <td style={{backgroundColor: element.color}}> </td>
                  <td>
                    <Link to={"/admin/styles/" + element._id + "/edit"}><i className="fas fa-edit"></i></Link>
                  </td>
                  <td>
                    <i className="fas fa-times" onClick={() => this.handleDelete(element._id)}></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
