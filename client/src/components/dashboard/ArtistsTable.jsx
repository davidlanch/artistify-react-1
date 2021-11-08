import React, { Component } from "react";
import APIHandler from "./../../api/handler";

export default class ArtistsTable extends Component {
  state = {
    elements: [],
  };

  componentDidMount() {
    APIHandler.get("api/artists")
      .then((data) => {
        this.setState({
          elements: [data],
          
        });
        console.log(data)
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
        <h1 className="title medium">Admin {this.props.model} + </h1>
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>style</th>
              <th>rates</th>
              <th>edit</th>
              <th>trash</th>
            </tr>
          </thead>
          <tbody>
            {this.state.elements.map((element) => {
              return (
                <tr>
                  <td> {element.name}</td>
                  <td> {element.style.name}</td>
                  <td>
                    {" "}
                    {element.rates
                      ? element.rates.reduce(
                          (acc, current) => acc + current[0].rate,
                          0
                        ) / element.rates.length
                      : "unrated"}
                  </td>
                  <td>
                    <i className="fas fa-edit"></i>
                  </td>
                  <td>
                    <i className="fas fa-times"></i>
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
