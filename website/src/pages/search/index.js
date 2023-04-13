import React from "react";
import ParkDetails from "../../components/park-details";
import SearchSidebar from "../../components/search-sidebar";
import {SearchParkDetailsCard} from "../../components/search_card";
import NavBar from "../../components/nav-bar";
import ParkReview from "../../components/review_card";

const review = {
    parkID: "Zion",
    summary: "Zion National Park is an American national park located in southwestern Utah near the town of Springdale.",
    message: "Zion National Park is a southwest Utah nature preserve distinguished by Zion Canyon’s steep red cliffs. Zion Canyon Scenic Drive cuts through its main section, leading to forest trails along the Virgin River. The river flows to the Emerald Pools, which have waterfalls and a hanging garden. Also along the river, partly through deep chasms, is Zion Narrows wading hike. ",
    author: "jsmith",
    rating: 10,
    likes: 0,
    creation_date: new Date(Date.now()),
    hidden: false
}

const Search = () => {
    return (
        <>
            <NavBar active="search"/>
            <div className={"row pt-5"}>
                <div className={"col-4"}>
                    <SearchSidebar/>
                </div>
                <div className={"col-8"}>
                    <SearchParkDetailsCard parkCode={"zion"}/>
                </div>
            </div>
            <hr></hr>
            <ParkDetails parkCode={"yell"}/>
            <hr></hr>
            <ParkReview review={review}/>
        </>
    );
}

export default Search;