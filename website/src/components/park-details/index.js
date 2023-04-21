import React, { useState, useEffect } from 'react';
import {getParkDetails} from "../../services/nps/nps-service";
import ReviewForm from "../create_review";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import NavBar from "../nav-bar";

const ParkDetails = () => {
    const {pid} = useParams();
    const parkCode = pid;
    const [park, setPark] = useState(null);
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
    );

    const entrancePasses = (
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


    return (
        <div className={"container pb-5"}>
          <NavBar active="search"/>
            <div className={"row text-center pt-3"}><a href={park.url}><h1>{park.fullName}: {park.states}</h1></a></div>
            <div className={"row pt-3"}>
                <div className={"col-8"}>
                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={park.images?.[0]?.url} className="d-block w-100" alt={park.images?.[0]?.altText}></img>
                            </div>
                            <div className="carousel-item">
                                <img src={park.images?.[1]?.url} className="d-block w-100" alt="..."></img>
                            </div>
                            <div className="carousel-item">
                                <img src={park.images?.[2]?.url} className="d-block w-100" alt="..."></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"col-4"}>
                    <div><b>Designation: </b>{park.designation}</div>
                    <div><b>Description: </b>{park.description}</div>
                    <hr></hr>
                    <div><b>Operating hours: </b>{park.operatingHours?.[0]?.description || 'Not available'}</div>
                    <hr></hr>
                    <div>{operatingHours()}</div>
                    <hr></hr>
                </div>
            </div>
            <div className={"row pt-4 pb-4"}>
                <div><b>Address: </b>
                    {park.addresses?.[0]?.line2} {park.addresses[0].line3}
                    {park.addresses[0].city}, {park.addresses[0].stateCode}
                    {park.addresses[0].postalCode}
                </div>
                <div><b>Directions:</b> {park.directionsInfo || 'Not available'} </div>
                <div><b>Link to Plan Your Visit: </b><a href={park.directionsUrl}>Here</a></div>
                <div><b> Latitude, Longitude: </b>{park.latitude}, {park.longitude}</div>
            </div>
            <div className={"row pb-4"}>
                <h3>Weather: </h3>
                <div> {park.weatherInfo || 'Not available'} </div>
            </div>
            <div className={"row pb-4"}>
                <h3>Entrance Fees: </h3> {feesTable}
            </div>
            <div className={"row pb-4"}>
                <h3>Entrance Passes: </h3> {entrancePasses}
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Contact The Park</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Reach out to the staff at the park!</h6>
                    <div className="row pb-4">
                        <div><b>Phone: </b>{park.contacts?.phoneNumbers?.[0]?.phoneNumber || 'Not available'}</div>
                        <div><b>Email: </b><a href={`mailto:${park.contacts?.emailAddresses?.[0]?.emailAddress || ''}`}>{park.contacts?.emailAddresses?.[0]?.emailAddress || 'Not available'}</a></div>
                    </div>
                </div>
            </div>
            {reviewIfLoggedIn()}
        </div>
    );
};

export default ParkDetails;
