import React, { Component } from "react";
import APIHandler from "../../api/handler";
import { Link } from "react-router-dom";

export default class LabelsTable extends Component {
  state = {
    elements: [],
  };

  fetch = () => {
    APIHandler.get("api/labels")
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
this.fetch()
  }

  handleDelete = (id) => {
    APIHandler.delete(`api/labels/${id}`)
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
        <h1 className="title medium">Admin Labels<Link to="/admin/labels/create">+</Link></h1>
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>country</th>
              <th>city</th>
    
              <th>edit</th>
              <th>trash</th>
            </tr>
          </thead>
          <tbody>
            {this.state.elements.map((element) => {
              return (
                <tr>
                  <td> {element.name}</td>
                  <td> {element.country}</td>
                  <td> {element.city}</td>
                  <td>
                    <i className="fas fa-edit" ></i>
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
