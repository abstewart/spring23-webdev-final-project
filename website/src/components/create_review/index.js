import React, { useState } from "react";

const ReviewForm = ({ parkCode, onAddReview }) => {
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReview = {
            parkCode,
            rating,
            comment
        };
        onAddReview(newReview);
        setRating("");
        setComment("");
    };

    return (
        <div>
            <hr></hr>
            <h2>Add a Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        className="form-control"
                        id="rating"
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group pb-4">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        className="form-control"
                        id="comment"
                        rows="3"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
