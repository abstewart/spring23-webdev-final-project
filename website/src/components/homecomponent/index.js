import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import NavBar from "../nav-bar";
import RandomImage from "../random_park_image";
import {useSelector} from "react-redux";
import ParkReview from "../review_card";
import {findMostRecentReview, findReviewsByUser} from "../../services/reviews/reviews-service";

const HomeComponent = () => {
    const { currentUser } = useSelector((state) => state.users);
    const [isLoading, setIsLoading] = useState(false);
    const [review, setReviews] = useState();

    useEffect(() => {
        if (!currentUser) {
            const fetchReviews = async () => {
                setIsLoading(true);
                const reviewsData = await findMostRecentReview();
                setReviews(reviewsData);
                setIsLoading(false);
            };
            fetchReviews().then();
        }
        else {
            const fetchReviews = async () => {
                setIsLoading(true);
                const reviewsData = await findReviewsByUser(currentUser.username);
                setReviews(reviewsData[0]);
                setIsLoading(false);
            };
            fetchReviews().then();
        }
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        else if (currentUser) {
            if (review) {
                return (
                    <div>
                        <h3>Hi, {currentUser.first_name}!</h3>
                        <h3>Take a look at the last park you reviewed:</h3>
                        <ParkReview review={review}/>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h3>Hi, {currentUser.first_name}!</h3>
                        <h3>No reviews yet? Go write one!</h3>
                    </div>
                );
            }
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
                <RandomImage/>
                <RandomImage/>
            </div>
            <div className="col-lg-4 col-m-2">
                <div className="row pt-2">
                    <h1>Welcome to the National Parks Explorer!</h1>
                    <h6>Explore the natural beauty of America's National Parks and Monuments.</h6>
                </div>
                <hr></hr>
                <div className="row">
                    <h3>Looking for something?</h3>
                    <div className={"container"}>
                        <Link to="/search" className="btn btn-primary">
                            Search for a Park
                        </Link>
                    </div>
                </div>
                <div>
                    <hr></hr>
                    <div>
                        {renderContent()}
                    </div>
                </div>
                <div className={"container pb-5"}>
                    <div className="row mt-5 p-2 bg-primary rounded">
                        <h3 className={"text-light pb-2"}>Interested in joining our community?</h3>
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
        </div>

    );
};

export default HomeComponent;
