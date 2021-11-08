import React, { Component } from "react";
import APIHandler from "./../../api/handler";

export default class AlbumsTable extends Component {
  state = {
    elements: [],
  };

  fetch = () => {
    APIHandler.get("api/albums")
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
    APIHandler.delete(`api/albums/${id}`)
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
        <h1 className="title medium">Admin Albums + </h1>
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>release</th>
              <th>rates</th>
              <th>label</th>
              <th>edit</th>
              <th>trash</th>
            </tr>
          </thead>
          <tbody>
            {this.state.elements.map((element) => {
              return (
                <tr>
                  <td> {element.title}</td>
                  <td> {element.releaseDate.toString().slice(0,10)}</td>
                  <td>
                    {/* {" "} */}
                    {element.rates.length
                      ? element.rates.reduce(
                          (acc, current) => acc + current[0].rate,
                          0
                        ) / element.rates.length
                      : "unrated"}
                  </td>
                  <td> {element.label.name}</td>
                  <td>
                    <i className="fas fa-edit"></i>
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
