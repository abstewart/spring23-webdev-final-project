import { useState } from 'react';
import {useSelector} from "react-redux";
import {createReview} from "../../services/reviews/reviews-service";

function ReviewForm({ parkCode }) {
    const [rating, setRating] = useState(5);
    const [summary, setSummary] = useState('');
    const [message, setMessage] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const { currentUser } = useSelector((state) => state.users);
    const handlePrivateToggle = () => {
        setIsPrivate(!isPrivate);
    };
    function handleSubmit(event) {
        event.preventDefault();
        const author = currentUser['username']; // replace with actual code to get the logged in user
        const review = {
            parkID: parkCode,
            author,
            rating,
            summary,
            message,
            // likes: 0, // this will be added by the server
            creation_date: Date.now(),
            hidden: isPrivate,
        };
        // do something with the review, e.g. send it to a server
        console.log(review);
        createReview(review).then(r => console.log(r));
    }

    return (
        <div className="form-group text-center">
        <form onSubmit={handleSubmit} className={"form-control"}>
            <h2>Add a Review</h2>
            <div className="form-check">
                <label className="form-check-label" htmlFor="private">Make review private:</label>
                <input className="form-check-input" type="checkbox" id="private" name="private" checked={isPrivate} onChange={handlePrivateToggle} />
            </div>
            <label className="col-form-label mt-4">
                <div> Rating: </div>
                <input
                    className={"form-control"}
                    type="number"
                    value={rating}
                    onChange={(event) => setRating(Number(event.target.value))}
                    min="1"
                    max="10"
                    required
                />
            </label>
            <br />
            <label>
                Summary:
                <input
                    className={"form-control"}
                    type="text"
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                    maxLength="200"
                    required
                />
            </label>
            <br />
            <label>
                Message:
                <textarea
                    rows = "15"
                    cols = "100"
                    className={"form-control"}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength="10000"
                    required
                />
            </label>
            <br />
            <button type="submit">Submit Review</button>
        </form>
        </div>
    );
}

export default ReviewForm;
