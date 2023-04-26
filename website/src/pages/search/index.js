import React from "react";
import SearchSidebar from "../../components/search-sidebar";
import NavBar from "../../components/nav-bar";

const Search = () => {
    return (
        <>
            <NavBar active="search"/>
            <div className={"row pt-5"}>
                <div className={"col-lg-4 pb-3"}>
                    <SearchSidebar/>
                </div>
            </div>
        </>
    );
}

export default Search;