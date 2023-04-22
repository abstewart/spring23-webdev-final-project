import React, {useEffect, useState} from "react";
import {getParkDetails} from "../../services/nps/nps-service";
import {Link} from "react-router-dom";

export const SearchParkDetailsCard = (
    {
        parkCode = "yell",
    })  => {
    const [park, setPark] = useState(null);
    useEffect(() => {
        const fetchPark = async () => {
            // const data = await response.json();
          const resp = await getParkDetails(parkCode);
          setPark(resp[0]);
        };
        fetchPark();
    }, [parkCode]);

    if (!park) {
        return <div>Loading...</div>;
    }


    return (
        <div className="card text-white bg-primary mb-3">
            <div className="card-header">
                <img src={park.images?.[0]?.url} className="d-block w-100" alt={park.images?.[0]?.altText} />
            </div>
            <div className="card-body">
                <Link to={"/details/" + parkCode}><h4>{park.name}</h4></Link>
                <p className="card-text">{park.description}</p>
            </div>
        </div>
    );
};