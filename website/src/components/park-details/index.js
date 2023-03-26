import React, { useState, useEffect } from 'react';

const ParkDetails = ({ parkCode }) => {
    const [park, setPark] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=CsPUxsJjlI83u6XabTVnAbX5kCQXBDv9HJQcpUUM`);
                const data = await response.json();
                setPark(data.data[0]);
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

    return (
        <div>
            <h1>{park.fullName}</h1>
            <p>{park.description}</p>
            <p>Directions: {park.directionsInfo || 'Not available'}</p>
            <p>Weather: {park.weatherInfo || 'Not available'}</p>
            <p>Entrance fees: {park.entranceFees?.[0]?.cost || 'Not available'}</p>
            <p>Operating hours: {park.operatingHours?.[0]?.description || 'Not available'}</p>
            <p>Phone: {park.contacts?.phoneNumbers?.[0]?.phoneNumber || 'Not available'}</p>
            <p>Email: {park.contacts?.emailAddresses?.[0]?.emailAddress || 'Not available'}</p>
            <img height={400} src={park.images?.[0]?.url} alt={park.images?.[0]?.altText} />
        </div>
    );
};

export default ParkDetails;
