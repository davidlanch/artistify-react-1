import React, { Component } from 'react'
import APIHandler from "./../../api/handler";
import "./../../styles/star.css"

export default class RatingStars extends Component {
    state = {
        rating: 0
    }

    componentDidMount = () => {
        APIHandler.get("/rating/" + this.props.category + "/" + this.props.id)
        .then((formerRating) => {
            this.setState({
                rating: formerRating
            })
        })
        .catch((err) => console.error(err))
    }

    handleClick = (rate) => {
        APIHandler.patch("/rating/" + this.props.category + "/" + this.props.id)
        .then((rate) => {
            this.setState({
                rating: rate
            })
        })
        .catch((err) => console.error(err))
    }
    
    render() {
        return (
            <div className='user stars'>

               <div className="one-star" onClick={() => this.handleClick(1)}>
                    <i className="far fa-star"></i>
                    <i className="fas fa-star"></i>
               </div> 

               <div className="one-star" onClick={() => this.handleClick(2)}>
                    <i className="far fa-star"></i>
                    <i className="fas fa-star"></i>
               </div> 

               <div className="one-star" onClick={() => this.handleClick(3)}>
                    <i className="far fa-star"></i>
                    <i className="fas fa-star"></i>
               </div> 

               <div className="one-star" onClick={() => this.handleClick(4)}>
                    <i className="far fa-star"></i>
                    <i className="fas fa-star"></i>
               </div> 

               <div className="one-star" onClick={() => this.handleClick(5)}>
                    <i className="far fa-star"></i>
                    <i className="fas fa-star"></i>
               </div> 

            </div>
        )
    }
}
