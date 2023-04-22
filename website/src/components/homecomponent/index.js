import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import NavBar from "../nav-bar";
import RandomImage from "../random_park_image";
import {useSelector} from "react-redux";
import ParkReview from "../review_card";
import {findMostRecentReview, findReviewsByUser} from "../../services/reviews/reviews-service";

const HomeComponent = () => {
    const { currentUser } = useSelector((state) => state.users);
    const [review, setReviews] = useState();

    useEffect(() => {
        if (!currentUser) {
            const fetchReviews = async () => {
                const reviewsData = await findMostRecentReview();
                setReviews(reviewsData);
            };
            fetchReviews().then(r => console.log(r));
        }
        else {
            const fetchReviews = async () => {
                const reviewsData = await findReviewsByUser(currentUser.username);
                setReviews(reviewsData[0]);
            };
            fetchReviews().then(r => console.log(r));
        }
    }, []);

    const renderContent = () => {
        if (currentUser) {
            return (
                <div>
                    <h3>Last Visited Park:</h3>
                    <ParkReview review={review}/>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Most Recent Review:</h3>
                    <ParkReview review={review}/>
                </div>
            );
        }
    };


    return (
        <div className={"container text-center"}>
            <NavBar/>
            <div className={"row pt-5"}>
            <div className={"col-lg-8 col-sm-12 pt-2 "}>
                <div className={"row"}>
                    <RandomImage/>
                </div>
                <div className={"row"}>
                    <RandomImage/>
                </div>
            </div>
            <div className="col-lg-4 col-m-2">
                <div className="row pt-2">
                    <h1>Welcome to our National Parks Website!</h1>
                    <h6>Explore the natural beauty of America's National Parks.</h6>
                </div>
                <hr></hr>
                <div className="row">
                    <h3>Looking for something?</h3>
                    <Link to="/search" className="btn btn-primary">
                        Search for a Park
                    </Link>
                </div>
                <div>
                    <hr></hr>
                    <div>
                        {renderContent()}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-6">
                        <Link to="/register" className="btn btn-secondary">
                            Join us!
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/login" className="btn btn-secondary">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
};

export default HomeComponent;
