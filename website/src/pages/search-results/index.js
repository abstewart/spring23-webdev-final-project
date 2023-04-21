import React, {useEffect, useState} from "react";
import SearchSidebar from "../../components/search-sidebar";
import {SearchParkDetailsCard} from "../../components/search_card";
import NavBar from "../../components/nav-bar";
import {generalParkSearch} from "../../services/nps/nps-service";
import {useParams} from "react-router";


const SearchResults = () => {
    const {val} = useParams();
    const {keywords} = useParams();
    const {state} = useParams();
    const [parks, setParks] = useState([]);

    useEffect(() => {
        const fetchParks = async () => {
            const parksData = await generalParkSearch({state: state,term: val + " " + keywords});
            setParks(parksData);
        };
        fetchParks().then(r => console.log(r));
    }, []);

    const allParks = () => {
        return parks.map((park) => (
            <li className="list-group-item" key={park.id}>
                <SearchParkDetailsCard parkCode={park.parkCode}/>
            </li>
        ));
    }

    return (
        <>
            <NavBar active="search"/>
            <div className={"row pt-5"}>
                <div className={"col-4"}>
                    <h3>Not what you were looking for?</h3>
                    <SearchSidebar/>
                </div>
                <div className={"col-8"}>
                    <ul className="list-group list-group-flush">
                        {allParks()}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SearchResults;