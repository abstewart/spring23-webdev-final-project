import React, {useState} from 'react';
import {Link} from "react-router-dom";

const SearchSidebar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [selectedState, setSelectedState] = useState('AL');

    return(
        <div className="pt-3">
            <div className="form-group">
                <label htmlFor="site-search">Search the site:</label>
                <input type="search" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="" data-np-autofill-type="email"
                       data-np-uid="1fced461-bf4c-42ef-bdcb-502ffbb7e276"
                       onChange={(e) => setSearchTerm(e.target.value)}>
                </input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleSelect2" className="form-label mt-4">Activity Search:</label>
                <select multiple="yes" className="form-select" id="exampleSelect2"
                        onChange={(e) => setSelectedKeywords(Array.from(e.target.selectedOptions, (option) => option.value))
                }>
                    <option value="KEYWORD-1">Hiking</option>
                    <option value="KEYWORD-2">Kayaking</option>
                    <option value="KEYWORD-3">Camping</option>
                    <option value="KEYWORD-4">Tours</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleSelect2" className="form-label mt-4">State Search:</label>
                <select className="form-select" id="exampleSelect2" onChange={(e) => setSelectedState(e.target.value)}>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option value="WY">Wyoming</option>
                </select>
            </div>
            <br/>
            <div className="pt-2 ">
                <Link to={"/results/" + searchTerm + "/" + selectedKeywords + "/" + selectedState}>
                    <button className={"btn btn-primary"}>Search</button>
                </Link>
            </div>
        </div>
            );
}
export default SearchSidebar;