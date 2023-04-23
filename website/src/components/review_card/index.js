import React, {useEffect, useState} from 'react';
import {
    createReviewLike,
    deleteReviewLike,
    findWhoLikedReview,
    numLikesForReview
} from "../../services/reviewLikes/reviewLikes-service";
import {useSelector} from "react-redux";


const ParkReview = (
    {
        review = {
            _id: "0",
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
                const resp = await numLikesForReview(review._id);
                setNumLikes(resp.numLikes);
            };
            fetchNumLikes(review).then(r => console.log(r));

            const findWhoLiked = async (review) => {
                const resp = await findWhoLikedReview(review._id);
                // remove all IDs from the array and only keep usernames
                const usernames = resp.map((user) => user.username);
                setWhoLiked(usernames);
            };
            findWhoLiked(review).then(r => console.log(r));

        }

    }, []);

    function handleLike() {
        console.log("Like this review");
        const likeReview = async (review) => {
            const resp = await createReviewLike(review._id);
            console.log(resp)
            const resp2 = await numLikesForReview(review._id);
            console.log(resp2)
            setNumLikes(resp2.numLikes);
        };
        likeReview(review).then(r => console.log(r));
    }

    function handleUnlike() {
        console.log("Unlike this review");

        const unlikeReview = async (review) => {
            const resp = await deleteReviewLike(review._id);
            console.log(resp)
            const resp2 = await numLikesForReview(review._id);
            console.log(resp2)
            setNumLikes(resp2.numLikes);
        };
        unlikeReview(review).then(r => console.log(r));
    }

    function likeorUnlike() {
        console.log(whoLiked)
        //if the user has already liked this review return a button that says "Unlike"
        //else return a button that says "Like"
        if (!whoLiked.includes(currentUser.username)) {
            return <div className={"container pt-1"}><button type={"button"} className={"btn btn-primary"} onClick={handleLike}>Like this Review</button></div>;
        }
        else {
            return <div className={"container pt-1"}><button type={"button"} className={"btn btn-primary"} onClick={handleUnlike}>Unlike this Review</button></div>;
        }
    }

    if (currentUser) {

        return (
            <div className={"container"}>
                <div className="card">
                    <a href={"/details/" + review.parkId} className="btn btn-primary stretched-link"><h3>{review.parkId}</h3></a>
                    <div className="card-body">
                        <h5 className="card-title">{review.summary}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Author: {review.author}</h6>
                        <p className="card-text">{review.message}</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Rating: {review.rating}/10</li>
                            <li className="list-group-item">Likes: {numLikes}</li>
                            <li className="list-group-item">Created: {new Date(review.creation_date).toDateString()}</li>
                        </ul>
                    </div>
                </div>
                {likeorUnlike()}
            </div>
        );
    }
    else {
        return (
            <div className="card mb-3">
                <a href={"/details/" + review.parkId} className="btn btn-primary stretched-link">{""}</a>
                <h3 className="card-header">>{review.parkId}</h3>
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