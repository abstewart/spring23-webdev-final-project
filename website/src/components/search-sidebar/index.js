import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";


const SearchSidebar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [selectedState, setSelectedState] = useState('None');

    const val = useParams();
    const keywords = useParams();
    const state = useParams();

    useEffect(() => {
        if (val.val === " ") {
            setSearchTerm('');
        }
        else {
            setSearchTerm(val.val);
        }

        if (keywords.keywords === " " || keywords.keywords === undefined) {
            setSelectedKeywords([]);
        }
        else {
            setSelectedKeywords(keywords.keywords.split("-"));
            console.log("These are the selected keywords", selectedKeywords);
        }

        if (state.state === " " || state.state === undefined) {
            setSelectedState('None');
        }
        else {
            setSelectedState(state.state);
        }
    }, []);


    let navigate = useNavigate();
    function handleSubmit() {
        navigate(createLink());
        window.location.reload();
    }

    function handleSelectKeyword(e) {
        setSelectedKeywords(Array.from(e.target.selectedOptions, (option) => option.value));
    }

    function createLink() {
        let link = "/search/";
        if (searchTerm !== "") {
            link += searchTerm;
            link += "/";
        }
        else {
            link += " /"
        }

        if (selectedKeywords.length !== 0) {
            selectedKeywords.forEach((keyword) => {
                link += keyword;
                link += "-";
            });
            link = link.substring(0, link.length - 1);
            link += "/";
        }
        else{
            link += " /"
        }

        if (selectedState !== "None") {
            link += selectedState;
            link += "/";
        }
        else {
            link += " /"
        }

        console.log("This is the link:", link);
        return link;
    }

    function handleOption(optionVal, optionView, selectedBank) {
        if (selectedBank === undefined) {
            return <option value={optionVal}>{optionView}</option>
        }
        if (selectedBank.includes(optionVal) || selectedState === optionVal) {
            return <option value={optionVal} selected>{optionView}</option>
        }
        else{
            return <option value={optionVal}>{optionView}</option>
        }
    }

    return(
        <div className="pt-3">
            <div className="form-group">
                <label htmlFor="site-search">Search the site:</label>
                <input type="search" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="" data-np-autofill-type="email"
                       data-np-uid="1fced461-bf4c-42ef-bdcb-502ffbb7e276"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}>
                </input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleSelect2" className="form-label mt-4">Activity Search:</label>
                <select multiple="yes" className="form-select" id="exampleSelect2"
                        onChange={(e) => handleSelectKeyword(e)}>
                    {handleOption("Hiking", "Hiking", selectedKeywords)}
                    {handleOption("Kayaking", "Kayaking", selectedKeywords)}
                    {handleOption("Camping", "Camping", selectedKeywords)}
                    {handleOption("Tours", "Tours", selectedKeywords)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleSelect2" className="form-label mt-4">State Search:</label>
                <select className="form-select" id="exampleSelect2" onChange={(e) => setSelectedState(e.target.value)}>
                    {handleOption(" ", "None", selectedState)}
                    {handleOption("AL", "Alabama", selectedState)}
                    {handleOption("AK", "Alaska", selectedState)}
                    {handleOption("AZ", "Arizona", selectedState)}
                    {handleOption("AR", "Arkansas", selectedState)}
                    {handleOption("CA", "California", selectedState)}
                    {handleOption("CO", "Colorado", selectedState)}
                    {handleOption("CT", "Connecticut", selectedState)}
                    {handleOption("DE", "Delaware", selectedState)}
                    {handleOption("DC", "District Of Columbia", selectedState)}
                    {handleOption("FL", "Florida", selectedState)}
                    {handleOption("GA", "Georgia", selectedState)}
                    {handleOption("HI", "Hawaii", selectedState)}
                    {handleOption("ID", "Idaho", selectedState)}
                    {handleOption("IL", "Illinois", selectedState)}
                    {handleOption("IN", "Indiana", selectedState)}
                    {handleOption("IA", "Iowa", selectedState)}
                    {handleOption("KS", "Kansas", selectedState)}
                    {handleOption("KY", "Kentucky", selectedState)}
                    {handleOption("LA", "Louisiana", selectedState)}
                    {handleOption("ME", "Maine", selectedState)}
                    {handleOption("MD", "Maryland", selectedState)}
                    {handleOption("MA", "Massachusetts", selectedState)}
                    {handleOption("MI", "Michigan", selectedState)}
                    {handleOption("MN", "Minnesota", selectedState)}
                    {handleOption("MS", "Mississippi", selectedState)}
                    {handleOption("MO", "Missouri", selectedState)}
                    {handleOption("MT", "Montana", selectedState)}
                    {handleOption("NE", "Nebraska", selectedState)}
                    {handleOption("NV", "Nevada", selectedState)}
                    {handleOption("NH", "New Hampshire", selectedState)}
                    {handleOption("NJ", "New Jersey", selectedState)}
                    {handleOption("NM", "New Mexico", selectedState)}
                    {handleOption("NY", "New York", selectedState)}
                    {handleOption("NC", "North Carolina", selectedState)}
                    {handleOption("ND", "North Dakota", selectedState)}
                    {handleOption("OH", "Ohio", selectedState)}
                    {handleOption("OK", "Oklahoma", selectedState)}
                    {handleOption("OR", "Oregon", selectedState)}
                    {handleOption("PA", "Pennsylvania", selectedState)}
                    {handleOption("RI", "Rhode Island", selectedState)}
                    {handleOption("SC", "South Carolina", selectedState)}
                    {handleOption("SD", "South Dakota", selectedState)}
                    {handleOption("TN", "Tennessee", selectedState)}
                    {handleOption("TX", "Texas", selectedState)}
                    {handleOption("UT", "Utah", selectedState)}
                    {handleOption("VT", "Vermont", selectedState)}
                    {handleOption("VA", "Virginia", selectedState)}
                    {handleOption("WA", "Washington", selectedState)}
                    {handleOption("WV", "West Virginia", selectedState)}
                    {handleOption("WI", "Wisconsin", selectedState)}
                    {handleOption("WY", "Wyoming", selectedState)}
                </select>
            </div>
            <br/>
            <div className="pt-2">
                <button className={"btn btn-primary w-100"} onClick={handleSubmit}>Search</button>
            </div>
        </div>
            );
}
export default SearchSidebar;