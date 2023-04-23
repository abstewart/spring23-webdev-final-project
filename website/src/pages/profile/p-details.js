import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {findReviewsByUser} from "../../services/reviews/reviews-service";
import Review_card from "../../components/review_card";
import {SearchParkDetailsCard} from "../../components/search_card";
import {findParksLikedByUser} from "../../services/parkLikes/parkLikes-service";
import {useParams} from "react-router";
import {findUserById} from "../../services/users/users-service";

const PDetails = () => {
    const uid = useParams();
    const [user, setUser] = useState("");
    const [parkReviews, setParkReviews] = useState([]);
    const [likedParks, setLikedParks] = useState([]);
    const { currentUser } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviewsData = await findReviewsByUser(currentUser.username);
            setParkReviews(reviewsData);
            console.log(reviewsData);
        };
        fetchReviews().then(r => console.log(r));

        const fetchLikedParks = async () => {
            const likedParksData = await findParksLikedByUser();
            setLikedParks(likedParksData);
            console.log(likedParksData);
        };
        fetchLikedParks().then(r => console.log(r));

        const getUserByUsername = async () => {
            const user = await findUserById(uid);
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
                <SearchParkDetailsCard parkCode={park}/>
            </li>
        ));
    }

    const renderProfile = () => {
        return (
            <div className="card mb-3 mt-4">
                <h3 className="card-header">{user.first_name}</h3>
                <div className="card-body">
                    <h5 className="card-title">Email: {user.email || "Not available"}</h5>
                    <h6 className="card-subtitle text-muted">{user.username}</h6>
                </div>
                <div className={"card-body text-center text-light"}>
                    <h1>Liked Parks:</h1>
                </div>
                <ul className="list-group list-group-flush">

                </ul>
                <div className={"card-body text-center text-light"}>
                    <h1>Reviewed Parks</h1>
                </div>
                <ul className="list-group list-group-flush">
                    {allReviewedParks()}
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



