import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {findReviewsByUser} from "../../services/reviews/reviews-service";
import Review_card from "../../components/review_card";

const PDetails = () => {
    const [parkReviews, setParkReviews] = useState([]);
    const { currentUser } = useSelector((state) => state.users);

    useEffect(() => {
        if (currentUser) {
            const fetchReviews = async () => {
                const reviewsData = await findReviewsByUser(currentUser.username);
                setParkReviews(reviewsData);
                console.log(reviewsData);
            };
            fetchReviews().then(r => console.log(r));
        }
    }, [currentUser]);

    const defaultProfile = (
        <div className="card mb-3 mt-4">
            <h5 className="card-header">Anonymous User</h5>
            <div className={"card-body"}>
                <h3>Reviewed Parks: N/A</h3>
            </div>
            <ul className="list-group list-group-flush">
            </ul>
            <div className={"card-body"}>
                <h3>Liked Parks: N/A</h3>
            </div>
            <ul className="list-group list-group-flush">
            </ul>
        </div>
    );

    const allReviewedParks = () => {
        return parkReviews.map((review) => (
            <li className="list-group-item" key={review.id}>
                <Review_card review={review}/>
            </li>
        ));
    }

    const renderProfile = () => {
        if (currentUser) {
            return (
                <div className="card mb-3 mt-4">
                    <h3 className="card-header">{currentUser.first_name} {currentUser.last_name}</h3>
                    <div className="card-body">
                        <h5 className="card-title">Email: {currentUser.email || "Not available"}</h5>
                        <h6 className="card-subtitle text-muted">{currentUser.username}</h6>
                    </div>
                    <div className={"card-body"}>
                        <h3>Liked Parks:</h3>
                    </div>
                    <ul className="list-group list-group-flush">

                    </ul>
                    <div className={"card-body"}>
                        <h3>Reviewed Parks:</h3>
                    </div>
                    <ul className="list-group list-group-flush">
                        {allReviewedParks()}
                    </ul>
                </div>
            );
        }
        return defaultProfile;
    };

    return (
        <>
            <div className={"pt-2"}>
                <h1>Profile</h1>
            </div>
            {renderProfile()}
        </>
    );
};

export default PDetails;



