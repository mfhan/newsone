import React from 'react';
import '../App.css';
import axios from 'axios'
import {
  Route,
  Navigate,
} from "react-router-dom"

//1. Create a search window 
//2. be able to take the input - handleChange
//3. handleSubmit 

function SearchInput({searchWord, setSearchWord, setSubmitCompleted}){

const handleNewsInputChange = (event) => {
	setSearchWord(event.target.value);
  console.log("this is the input", event.target.value)
};
//event.target.value comprises all the letters typed  
//then we take the current value of the search word 

//const navigate = useNavigate()

const handleSubmit = (event) => {
  event.preventDefault();
    console.log("search word from handleSubmit: ", searchWord)   
    setSubmitCompleted(true)
}

    return (
<form onSubmit={handleSubmit}>
  <input
        id="searchWord"
        className="form-field"
        type="text"
        placeholder="search the news"
        onChange={handleNewsInputChange}
        value={searchWord}
    />
<input id="button" type="submit" value="Any search word!" />
</form>
    )
}

export default SearchInput