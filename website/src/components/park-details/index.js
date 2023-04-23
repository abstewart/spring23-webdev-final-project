import React, { useState, useEffect } from 'react';
import {getParkDetails} from "../../services/nps/nps-service";
import ReviewForm from "../create_review";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import NavBar from "../nav-bar";
import {
    createParkLike,
    deleteParkLike, findParksLikedByUser,
    findWhoLikedPark,
    numLikesForPark
} from "../../services/parkLikes/parkLikes-service";

const ParkDetails = () => {
    const {pid} = useParams();
    const parkCode = pid;
    const [park, setPark] = useState(null);
    const [numLikes, setNumLikes] = useState(0);
    const [whoLiked, setWhoLiked] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentUser } = useSelector((state) => state.users);

    const reviewIfLoggedIn = () => {
        if (currentUser) {
            return (
                <div>
                    <h2>Leave a Review</h2>
                    <ReviewForm parkCode={parkCode}/>
                </div>
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            getParkDetails(parkCode)
                .then((response) => {
                    setPark(response?.[0]);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        };

        fetchData().then(r => console.log(r));

        const fetchNumLikes = async () => {
            setIsLoading(true);

            numLikesForPark(parkCode)
                .then((response) => {
                    console.log(response.numLikes)
                    setNumLikes(response.numLikes);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        };
        fetchNumLikes().then(r => console.log(r));

        const findWhoLiked = async (parkCode) => {
            const resp = await findWhoLikedPark(parkCode);
            // remove all IDs from the array and only keep usernames
            const usernames = resp.map((user) => user.username);
            setWhoLiked(usernames);
        };
        findWhoLiked(parkCode).then(r => console.log(r));
    }, [parkCode]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!park) {
        return null;
    }

    const feesTable = (
        <div className={"list-group-item"}>
            <h3>Entrance Fees: </h3>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Title</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Description</th>
                </tr>
                </thead>
                <tbody>
                {park.entranceFees?.map((fee) => (
                    <tr key={fee.title} className={`table-${fee.type}`}>
                        <th scope="row">{fee.type}</th>
                        <td>{fee.title}</td>
                        <td>${fee.cost}</td>
                        <td>{fee.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    const entrancePasses = (
        <div className={"list-group-item"}>
            <h3>Entrance Passes: </h3>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Pass Type</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Description</th>
                </tr>
                </thead>
                <tbody>
                {park.entrancePasses.map((pass) => (
                    <tr key={pass.title}>
                        <td>{pass.title}</td>
                        <td>${pass.cost}</td>
                        <td>{pass.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    // Create an array of objects containing opening and closing times for each day
    const hoursArray = Object.entries(park.operatingHours[0].standardHours).map(([day, hours]) => ({
        day,
        time: hours
    }));

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const operatingHours = () => {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Day</th>
                        <th>Opening Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hoursArray.map(({ day, time }) => (
                        <tr key={day}>
                            <td>{capitalize(day)}</td>
                            <td>{time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    function handleLike() {
        console.log("Like this park");
        const likePark = async (parkCode) => {
            const resp = await createParkLike(parkCode, park.name);
            console.log(resp)
            const resp2 = await numLikesForPark(parkCode);
            console.log(resp2)
            setNumLikes(resp2.numLikes);
        };

        const findWhoLiked = async (parkCode) => {
            const resp = await findWhoLikedPark(parkCode);
            // remove all IDs from the array and only keep usernames
            const usernames = resp.map((user) => user.username);
            setWhoLiked(usernames);
        };
        likePark(parkCode).then(r =>  findWhoLiked(parkCode).then());
    }

    function handleUnlike() {
        console.log("Unlike this park");
        let likeId = "";
        // find the like ID for this park
        const likeIdForPark = async (parkCode) => {
            const resp = await findParksLikedByUser(currentUser.username);
            console.log(resp)
            // find the like ID for this park liked by the current user
            likeId = resp.find((like) => like.park === parkCode)._id;
        };


        const unlikePark = async (parkCode) => {
            const resp = await deleteParkLike(likeId);
            console.log(resp)
            const resp2 = await numLikesForPark(parkCode);
            console.log(resp2)
            setNumLikes(resp2.numLikes);
        };
        const findWhoLiked = async (parkCode) => {
            const resp = await findWhoLikedPark(parkCode);
            // remove all IDs from the array and only keep usernames
            const usernames = resp.map((user) => user.username);
            setWhoLiked(usernames);
        };
        likeIdForPark(parkCode).then(r => unlikePark(parkCode).then(r => findWhoLiked(parkCode).then()));

    }

    function likeorUnlike() {
        if (currentUser === null) {
            return ;
        }
        console.log(whoLiked)
        //if the user has already liked this review return a button that says "Unlike"
        //else return a button that says "Like"
        if (!whoLiked.includes(currentUser.username)) {
            return <div className={"pt-2 row m-2"}><button type={"button"} className={"btn btn-secondary btn-like"} onClick={handleLike}>Like this Park!</button></div>;
        }
        else {
            return <div className={"pt-2 row m-2"}><button type={"button"} className={"btn btn-secondary btn-like"} onClick={handleUnlike}>Unlike this Park</button></div>;
        }
    }

    const reviews = () => {
        return (
            <div className="accordion pt-3" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                            collapse plugin adds the appropriate classes that we use to style each element. These
                            classes control the overall appearance, as well as the showing and hiding via CSS
                            transitions. You can modify any of this with custom CSS or overriding our default variables.
                            It's also worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                            the collapse plugin adds the appropriate classes that we use to style each element. These
                            classes control the overall appearance, as well as the showing and hiding via CSS
                            transitions. You can modify any of this with custom CSS or overriding our default variables.
                            It's also worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                            collapse plugin adds the appropriate classes that we use to style each element. These
                            classes control the overall appearance, as well as the showing and hiding via CSS
                            transitions. You can modify any of this with custom CSS or overriding our default variables.
                            It's also worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className={"container pb-5"}>
          <NavBar active="search"/>
            <div className={"row text-center pt-3"}><a href={park.url}><h1>{park.fullName}: {park.states}</h1></a></div>
            <div className={"row pt-3"}>
                <div className={"col-lg-8 col-md-12"}>
                    <div id="carouselExampleSlidesOnly" className="carousel slide row" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={park.images?.[0]?.url} className="d-block w-100 rounded" alt={park.images?.[0]?.altText}></img>
                            </div>
                            <div className="carousel-item">
                                <img src={park.images?.[1]?.url} className="d-block w-100" alt="..."></img>
                            </div>
                            <div className="carousel-item">
                                <img src={park.images?.[2]?.url} className="d-block w-100" alt="..."></img>
                            </div>
                        </div>
                    </div>
                    {likeorUnlike()}
                    <div className={"row m-2"}>
                        <span className="badge bg-light">Number of likes: {numLikes} </span>
                    </div>
                </div>
                <div className={"list-group col-lg-4 col-md-12 pt-md-3 pt-lg-0"}>
                    <div className={"list-group-item"}><b>Designation: </b>{park.designation}</div>
                    <div className={"list-group-item"}><b>Description: </b>{park.description}</div>
                    <hr></hr>
                    <div className={"list-group-item"}><b>Operating hours: </b>{park.operatingHours?.[0]?.description || 'Not available'}</div>
                    <hr></hr>
                    <div className={""}>{operatingHours()}</div>
                    <hr></hr>
                </div>
            </div>
            <div className={"row pt-4 pb-4 list-group"}>
                <div className={"list-group-item"}><b>Address: </b>
                    {park.addresses?.[0]?.line2} {park.addresses[0].line3}
                    {park.addresses[0].city}, {park.addresses[0].stateCode}
                    {park.addresses[0].postalCode}
                </div>
                <div className={"list-group-item"}><b>Directions:</b> {park.directionsInfo || 'Not available'} </div>
                <div className={"list-group-item"}><b>Link to Plan Your Visit: </b><a href={park.directionsUrl}>Here</a></div>
                <div className={"list-group-item"}><b> Latitude, Longitude: </b>{park.latitude}, {park.longitude}</div>
            </div>
            <div className={"row pb-4 list-group"}>
                <div className={"list-group-item"}><h3>Weather </h3>{park.weatherInfo || 'Not available'} </div>
            </div>
            <div className={"row pb-4 list-group"}>
                {feesTable}
            </div>
            <div className={"row pb-4 list-group"}>
                {entrancePasses}
            </div>
            <div className="row pb-4 list-group">
                <div className="list-group-item">
                    <h3 className="">Contact Information</h3>
                    <h6 className="mb-2 text-muted">Reach out to the staff at the park!</h6>
                    <div className="row pb-4">
                        <div className={""}><b>Phone: </b><a href={`tel:${park.contacts?.phoneNumbers?.[0]?.phoneNumber || 'Not available'}`}>{formatPhoneNumber(park.contacts?.phoneNumbers?.[0]?.phoneNumber || 'Not available')}</a></div>
                        <div><b>Email: </b><a href={`mailto:${park.contacts?.emailAddresses?.[0]?.emailAddress || ''}`}>{park.contacts?.emailAddresses?.[0]?.emailAddress || 'Not available'}</a></div>
                    </div>
                </div>
            </div>
            {reviewIfLoggedIn()}
            {reviews()}
        </div>
    );
};

export default ParkDetails;
