import React, { Component } from "react";
import { Link } from 'react-router-dom';
import APIHandler from "../../api/handler";
import "./../../styles/table.css"

export default class ArtistsTable extends Component {
  state = {
    elements: [],
  };
  

  fetch = () => {
    APIHandler.get("api/artists")
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
    APIHandler.delete(`api/artists/${id}`)
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
        <h1 className="title medium">Admin Artists
        <Link  exact to={'/admin/artists/create'}>
            <p>+</p>
          </Link>
           </h1>
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
                  <td> <pre>{element.style ? element.style.name : "no style"}</pre></td>
                  <td>
                    {element.rates.length
                      ? element.rates.reduce(
                          (acc, current) => acc + current[0].rate,
                          0
                        ) / element.rates.length
                      : "unrated"}
                  </td>
                  <td>
                  <Link  exact to={'/admin/artists/' + element._id + '/edit'}>
            <i className="fas fa-edit" ></i>
          </Link>
                    
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
