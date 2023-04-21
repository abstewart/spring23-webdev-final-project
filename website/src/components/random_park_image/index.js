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

    return <img className="img-responsive " src={imageUrl} alt="Random park" />;
};

export default RandomImage;
