import React, { useState, useEffect } from 'react';
import {generalParkSearch} from '../../services/nps/nps-service';
const RandomImage = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        //console.log(randomLetter)

        generalParkSearch({ state: "", term: randomLetter })
            .then(response => {
                const randomIndex = Math.floor(Math.random() * response.length);
                //console.log(randomIndex);
                //console.log(response[randomIndex]);
                setImageUrl(response[randomIndex].images?.[0]?.url);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    return (
        <div className={"row pb-5 pe-3"}>
            <img className="img-fluid rounded-5 border-5 border-dark border-opacity-100" src={imageUrl} alt="Random park" />
        </div>
    );
};

export default RandomImage;
