import React, {useEffect, useState} from "react";
import {getParkDetails} from "../../services/nps/nps-service";

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
            <a href={"/details/" + parkCode} className={"btn btn-primary stretched-link"}> <h3 className={"text-center"}>{park.name}</h3></a>
            <div className="card-header">
                <img src={park.images?.[0]?.url} className="img-fluid d-block w-100 rounded mt-2" alt={park.images?.[0]?.altText} />
            </div>
            <div className="card-body">
                <p className="card-text">{park.description}</p>
            </div>
        </div>
    );
};