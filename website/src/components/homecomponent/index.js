import React, {useState} from 'react';
import {Link} from "react-router-dom";
import NavBar from "../nav-bar";
import RandomImage from "../random_park_image";


const HomeComponent = () => {
    const [randomPark, setRandomPark] = useState(null);
    const [randomImage, setRandomImage] = useState(null);


    return (
        <div className={"container text-center"}>
            <NavBar/>
            <div className={"row pt-5"}>
            <div className={"col-8 pt-2"}>

                <div className={"row"}>
                    <RandomImage/>
                </div>
                <div className={"row"}>
                    <RandomImage/>
                </div>
            </div>
            <div className="col-4">
                <div className="row">
                    <h1>Welcome to our National Parks website!</h1>
                    <h6>Explore the natural beauty of America's National Parks.</h6>
                </div>
                <hr></hr>
                <div className="row">
                    <h3>Looking for something?</h3>
                    <Link to="/search" className="btn btn-primary">
                        Search for a Park
                    </Link>
                </div>
                <div>
                    <hr></hr>
                    <div>
                        // if logged in, show last visited park
                        // if not logged in, show anonymized review
                        <img
                            src="https://via.placeholder.com/500x300"
                            className="img-fluid"
                            alt="Placeholder"
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-6">
                        <Link to="/register" className="btn btn-secondary">
                            Join us!
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/login" className="btn btn-secondary">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
};

export default HomeComponent;
