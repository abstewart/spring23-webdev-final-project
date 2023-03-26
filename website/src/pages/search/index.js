import React from "react";
import ParkDetails from "../../components/park-details";
import SearchSidebar from "../../components/search-sidebar";

const Search = () => {
    return (
        <>
            <SearchSidebar/>
            <ParkDetails parkCode={"acad"}/>
        </>
    );
}

export default Search;