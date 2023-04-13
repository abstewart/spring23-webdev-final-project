import React from 'react';
import {Link} from "react-router-dom";


const ParkReview = (
    {
        review = {
            parkID: "N/A",
            summary: "This is a summary",
            message: "This is a message",
            author: "jsmith",
            rating: 10,
            likes: 0,
            creation_date: Date.now(),
            hidden: false
        }
    }
) => {
    console.log(review);
    return (
        <div className="card mb-3">
            <h3 className="card-header"><Link to={"/park/:" + review.parkID}>{review.parkID}</Link></h3>
            <div className="card-body">
                <h5 className="card-title">{review.summary}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{review.author}</h6>
                <p className="card-text">{review.message}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Rating: {review.rating}/10</li>
                <li className="list-group-item">Likes: {review.likes}</li>
                <li className="list-group-item">Created: {review.creation_date.toDateString()}</li>
            </ul>
        </div>
    );
};

export default ParkReview;