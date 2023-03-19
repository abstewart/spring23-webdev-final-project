import React from 'react';

const HomeSidebar = () => {
    return (
        <div className="col-5 float-end">
            <div className="row">
                <h1>NAME OF WEBSITE</h1>
                <h6>Description of why we made this website...</h6>
            </div>
            <div className="row pt-4">
                <h3>Looking for Something?</h3>
                {/* Search Bar: Replace link with reference to search page*/}
                <button className="btn btn-primary" href="#">
                    Search
                </button>
            </div>
            <div className="row pt-4">
                {/* Placeholder will be replaced with most recent post if logged in and random content if not */}
                <img
                    src="../images/placeholder.jpg"
                    className="p-0 m-0 img-fluid h-25"
                    alt="placeholder image"
                />
            </div>
            <div className="row pt-5">
                <h2>Join OUR community!</h2>
                // TODO: Replace link with reference to login page
                <button className="btn btn-primary" href="../login">
                    Sign Up/Log In
                </button>
            </div>
        </div>
    );
};

export default HomeSidebar;
