import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {createReviewLike, findWhoLikedReview, numLikesForReview} from "../../services/reviewLikes/reviewLikes-service";
import {useSelector} from "react-redux";


const ParkReview = (
    {
        review = {
            id: "0",
            parkId: "N/A",
            summary: "This is a summary",
            message: "This is a message",
            author: "jsmith",
            rating: 10,
            likes: 0,
            creation_date: new Date(Date.now()),
            hidden: false
        }
    }
) => {
    const { currentUser } = useSelector((state) => state.users);
    const [numLikes, setNumLikes] = useState(0);
    const [whoLiked, setWhoLiked] = useState([]);
    useEffect(() => {
        if (currentUser){
            const fetchNumLikes = async (review) => {
                const resp = await numLikesForReview(review.id);
                setNumLikes(resp);
            };
            fetchNumLikes(review).then(r => console.log(r));

            const findWhoLiked = async (review) => {
                const resp = await findWhoLikedReview(review.id);
                setWhoLiked(resp);
            };
            findWhoLiked(review).then(r => console.log(r));
        }
    }, []);

    function handleLike() {
        console.log("Like this review");
        const likeReview = async (review) => {
            const resp = await createReviewLike(review.id, currentUser.username);
            console.log(resp)
            //setNumLikes(resp);
        };
        likeReview(review).then(r => console.log(r));

    }

    function handleUnlike() {
        console.log("Unlike this review");
    }

    function likeorUnlike() {
        //if the user has already liked this review return a button that says "Unlike"
        //else return a button that says "Like"
        if (!whoLiked.includes(currentUser.username)) {
            return <button type={"button"} className={"btn btn-secondary"} onClick={handleLike}>Like this Review</button>;
        }
        else {
            return <button type={"button"} className={"btn btn-secondary"} onClick={handleUnlike}>Unlike this Review</button>;
        }
    }

    if (currentUser) {
        return (
            <div className="card mb-3">
                <h3 className="card-header"><Link to={"/details/" + review.parkId}>{review.parkId}</Link></h3>
                <div className="card-body">
                    <h5 className="card-title">{review.summary}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Author: {review.author}</h6>
                    <p className="card-text">{review.message}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Rating: {review.rating}/10</li>
                    <li className="list-group-item">Likes: {numLikes}</li>
                    <li className="list-group-item">Created: {new Date(review.creation_date).toDateString()}</li>
                    <li className="list-group-item">{likeorUnlike()}</li>
                </ul>
            </div>
        );
    }
    else {
        return (
            <div className="card mb-3">
                <h3 className="card-header"><Link to={"/details/" + review.parkId}>{review.parkId}</Link></h3>
                <div className="card-body">
                    <h5 className="card-title">{review.summary}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Author: {review.author}</h6>
                    <p className="card-text">{review.message}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Rating: {review.rating}/10</li>
                    <li className="list-group-item">Likes: {numLikes}</li>
                    <li className="list-group-item">Created: {new Date(review.creation_date).toDateString()}</li>
                </ul>
            </div>
        );
    }

};

export default ParkReview;