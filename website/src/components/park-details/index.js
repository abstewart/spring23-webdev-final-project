import React, { useState, useEffect } from 'react';
import Create_review from "../create_review";
import {getParkDetails} from "../../services/nps/nps-service";

const ParkDetails = ({ parkCode }) => {
    const [park, setPark] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await getParkDetails(parkCode);
                setPark(response.data[0]);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
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

    const entranceFees = park.entranceFees?.map((fee) => {
        return (
            <div>
                <b>{fee.title}: </b>${fee.cost}
                <div>{fee.description}</div>
            </div>
        )
    }, []);

    const entrancePasses = park.entrancePasses?.map((pass) => {
        return (
            <div>
                <b>{pass.title}: </b>${pass.cost}
                <div>{pass.description}</div>
            </div>
        )
    }, []);

    // Create an array of objects containing opening and closing times for each day
    const hoursArray = Object.entries(park.operatingHours[0].standardHours).map(([day, hours]) => ({
        day,
        time: hours
    }));

    const operatingHours = () => {
        return (
            <table>
                <thead>
                <tr>
                    <th>Day</th>
                    <th>Opening Time</th>
                </tr>
                </thead>
                <tbody>
                {hoursArray.map(({ day, time}) => (
                    <tr key={day}>
                        <td>{day}</td>
                        <td>{time}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    return (
        <div className={"container"}>
            <div className={"row text-center"}><a href={park.url}><h1>{park.fullName}: {park.states}</h1></a></div>
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
            </div>
            <div className={"row pb-4"}>
                <h3>Weather: </h3>
                <div> {park.weatherInfo || 'Not available'} </div>
            </div>
            <div className={"row pb-4"}>
                <h3>Entrance Fees: </h3> {entranceFees}
            </div>
            <div className={"row pb-4"}>
                <h3>Entrance Passes: </h3> {entrancePasses}
            </div>
            <div className={"row pb-4"}>
                <div><b>Phone: </b>{park.contacts?.phoneNumbers?.[0]?.phoneNumber || 'Not available'}</div>
                <div><b>Email: </b>{park.contacts?.emailAddresses?.[0]?.emailAddress || 'Not available'}</div>
                <div><b> Latitude, Longitude: </b>{park.latitude}, {park.longitude}</div>
            </div>

            <Create_review parkCode={parkCode}/>
        </div>
    );
};

export default ParkDetails;
