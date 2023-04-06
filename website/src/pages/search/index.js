import React from "react";
import ParkDetails from "../../components/park-details";
import SearchSidebar from "../../components/search-sidebar";
import {SearchParkDetailsCard} from "../../components/search_card";
import NavBar from "../../components/nav-bar";

const Search = () => {
    return (
        <>
            <NavBar/>
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
        </>
    );
}

export default Search;