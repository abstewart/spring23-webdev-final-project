import React, {useEffect, useState} from "react";
import SearchSidebar from "../../components/search-sidebar";
import {SearchParkDetailsCard} from "../../components/search_card";
import NavBar from "../../components/nav-bar";
import {generalParkSearch} from "../../services/nps/nps-service";
import {useParams} from "react-router";


const SearchResults = () => {
    let {val} = useParams();
    let {keywords} = useParams();
    let {state} = useParams();
    const [parks, setParks] = useState([]);

    useEffect(() => {
        if (state === undefined) {
            state = "";
        }
        if (keywords === undefined) {
            keywords = "";
        }
        if (val === undefined) {
            val = "";
        }
        const fetchParks = async () => {
            console.log("state: " + state);
            console.log("val: " + val);
            console.log("keywords: " + keywords);
            const parksData = await generalParkSearch({state: state,term: val + " " + keywords});
            setParks(parksData);
        };
        fetchParks().then(r => console.log(r));
    }, []);

    const allParks = () => {
        return parks.map((park) => (
            <SearchParkDetailsCard parkCode={park.parkCode}/>
        ));
    }

    return (
        <>
            <NavBar active="search"/>
            <div className={"row"}>
                <div className={"container col-md-4 col-sm-12 pt-5 mw-100"}>
                    <SearchSidebar/>
                </div>
                <div className={"col-md-8 col-sm-12 pt-5 pb-5"}>
                    <ul className="list-group list-group-flush">
                        {allParks()}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SearchResults;