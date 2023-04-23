import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {findReviewsByUser} from "../../services/reviews/reviews-service";
import Review_card from "../../components/review_card";
import {SearchParkDetailsCard} from "../../components/search_card";
import {findParksLikedByUsername} from "../../services/parkLikes/parkLikes-service";
import {useParams} from "react-router";
import {findUserByUsername} from "../../services/users/users-service";

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
                <h3 className="card-header">{user.username}</h3>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">{user.username}</h6>
                </div>
                <div className={"card-body text-center text-light"}>
                    <h1>{user.first_name}'s Reviewed Parks</h1>
                </div>
                <ul className="list-group list-group-flush">
                    {allReviewedParks()}
                </ul>
                <div className={"card-body text-center text-light"}>
                    <h1>{user.first_name}'s Liked Parks:</h1>
                </div>
                <ul className="list-group list-group-flush">
                    {allLikedParks()}
                </ul>
            </div>
        )
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



