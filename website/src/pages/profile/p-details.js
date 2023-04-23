import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findReviewsByUser} from "../../services/reviews/reviews-service";
import Review_card from "../../components/review_card";
import {SearchParkDetailsCard} from "../../components/search_card";
import {findParksLikedByUsername} from "../../services/parkLikes/parkLikes-service";
import {useParams} from "react-router";
import {findUserByUsername} from "../../services/users/users-service";
import {numLikesForReview} from "../../services/reviewLikes/reviewLikes-service";

const PDetails = () => {
    const uid = useParams().uid;
    const [user, setUser] = useState("");
    const [parkReviews, setParkReviews] = useState([]);
    const [likedParks, setLikedParks] = useState([]);
    const { currentUser } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviewsData = await findReviewsByUser(uid);
            setParkReviews(reviewsData);
        };
        fetchReviews().then();

        const fetchLikedParks = async () => {
            const likedParksData = await findParksLikedByUsername(uid);
            setLikedParks(likedParksData);
        };
        fetchLikedParks().then();

        const getUserByUsername = async () => {
            const user = await findUserByUsername(uid);
            setUser(user);
            console.log(user);
        };
        getUserByUsername().then(r => console.log(r));
    }, []);

    const allReviewedParks = () => {
        return parkReviews.map((review) => (
            <li className="list-group-item" key={review._id}>
                <Review_card review={review}/>
            </li>
        ));
    }

    const allLikedParks = () => {
        return likedParks.map((park) => (
            <li className="list-group-item" key={park._id}>
                <SearchParkDetailsCard parkCode={park.park}/>
            </li>
        ));
    }
    const renderProfile = () => {
        return (
            <div className="card mb-3 mt-4">
                <h1 className="card-header text-center">{user.first_name}'s Profile</h1>
                <div className={"card-header text-center"}>
                    <h4>Quick stats for {user.username}</h4>
                    <b>Number of reviews: </b> {parkReviews.length}
                    <br/>
                    <b>Number of liked parks: </b> {likedParks.length}
                    <br/>
                </div>
                <div className={"card-body text-center text-secondary"}>
                    <h3>{user.first_name}'s Reviewed Parks</h3>
                </div>
                <ul className="list-group list-group-flush">
                    {allReviewedParks()}
                </ul>
                <div className={"card-body text-center text-secondary"}>
                    <h3>{user.first_name}'s Liked Parks:</h3>
                </div>
                <ul className="list-group list-group-flush">
                    {allLikedParks()}
                </ul>
            </div>
        )
    };

    return (
        <>
            {renderProfile()}
        </>
    );
};

export default PDetails;



