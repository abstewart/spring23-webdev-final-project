import React, {useEffect, useState} from 'react';
import {
    createReviewLike,
    deleteReviewLikeByParams,
    findWhoLikedReview,
    numLikesForReview
} from "../../services/reviewLikes/reviewLikes-service";
import {useSelector} from "react-redux";


const ParkReview = (
    {
        review = {
            _id: null,
            parkId: "N/A",
            summary: "This is a summary",
            message: "This is a message",
            author: "jsmith",
            rating: 10,
            likes: 0,
            creation_date: new Date(Date.now()),
            hidden: false,
            parkName: "N/A"
        }
    }
) => {
    const { currentUser } = useSelector((state) => state.users);
    const [numLikes, setNumLikes] = useState(0);
    const [whoLiked, setWhoLiked] = useState([]);

    const findWhoLiked = async (review) => {
        const resp = await findWhoLikedReview(review._id);
        // remove all IDs from the array and only keep usernames
        const usernames = resp.map((user) => user.username);
        setWhoLiked(usernames);
    };

    useEffect(() => {
        if (currentUser){
            const fetchNumLikes = async (review) => {
                const resp = await numLikesForReview(review._id);
                setNumLikes(resp.numLikes);
            };
            if(review._id){
                fetchNumLikes(review).then();
            }
            findWhoLiked(review).then();

        }

    }, []);

    function handleLike() {
        const likeReview = async (review) => {
            const resp = await createReviewLike(review._id);
            const resp2 = await numLikesForReview(review._id);
            setNumLikes(resp2.numLikes);
        };
        likeReview(review).then(r => findWhoLiked(review));
    }

    function handleUnlike() {
        const unlikeReview = async (review) => {
            const resp = await deleteReviewLikeByParams(review._id);
            const resp2 = await numLikesForReview(review._id);
            setNumLikes(resp2.numLikes);
        };
        unlikeReview(review).then(r => findWhoLiked(review));
    }

    function likeorUnlike() {
        //if the user has already liked this review return a button that says "Unlike"
        //else return a button that says "Like"
        if (!whoLiked.includes(currentUser.username)) {
            return <div className={"container pt-2"}><button type={"button"} className={"btn btn-secondary btn-like"} onClick={handleLike}>Like this Review</button></div>;
        }
        else {
            return <div className={"container pt-2"}><button type={"button"} className={"btn btn-secondary btn-like"} onClick={handleUnlike}>Unlike this Review</button></div>;
        }
    }

    if (currentUser) {
        return (
            <div className={""}>
                <div className="card">
                    <a href={"/details/" + review.parkId} className="btn btn-primary stretched-link"><h3>{review.park_name}</h3></a>
                    <div className="card-body">
                        <h5 className="card-title">{review.summary}</h5>
                        <a href={"/profile/" + review.author} className={"author-link"}><h5 className="card-subtitle mb-2 text-muted">Author: {review.author}</h5></a>
                        <p className="card-text">{review.message}</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Rating: {review.rating}/10</li>
                            <li className="list-group-item">Likes: {numLikes}</li>
                            <li className="list-group-item">Created: {new Date(review.creation_date).toDateString()}</li>
                        </ul>
                        {likeorUnlike()}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={""}>
                <div className="card">
                    <a href={"/details/" + review.parkId} className="btn btn-primary stretched-link"><h3>{review.park_name}</h3></a>
                    <div className="card-body">
                        <h5 className="card-title">{review.summary}</h5>
                        <a href={"/profile/" + review.author} className={"author-link"}><h5 className="card-subtitle mb-2 text-muted">Author: {review.author}</h5></a>
                        <p className="card-text">{review.message}</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Rating: {review.rating}/10</li>
                            <li className="list-group-item">Likes: {numLikes}</li>
                            <li className="list-group-item">Created: {new Date(review.creation_date).toDateString()}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

};

export default ParkReview;