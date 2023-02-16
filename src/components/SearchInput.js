import React from 'react';
import '../App.css';
import axios from 'axios';
import {
  Route,
  Navigate,
} from "react-router-dom"

//1. Create a search window 
//2. be able to take the input - handleChange
//3. handleSubmit 
//4. create handleLang function, connect it to 

function SearchInput({ searchWord, setSearchWord, setLanguage, setSubmitCompleted }) {

  const handleNewsInputChange = (event) => {
    setSearchWord(event.target.value);
    console.log("this is the input", event.target.value)
  };
  //event.target.value comprises all the letters typed  
  //then we take the current value of the search word 

  //const navigate = useNavigate()

  const languageChoice = ['', 'ar', 'cn', 'de', 'en', 'es', 'fr', 'he', 'it', 'ja', 'ko', 'nl', 'no', 'pt', 'ru']
  const languageOptions = languageChoice.map((lang, i) => {
    return (
      <option key={lang} value={lang}> {lang} </option>
    )
  })

  const handleLang = (event) => {
    event.preventDefault();
    setLanguage(event.target.value);
  }

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
      <label for="language">Language:</label>
      <select
        name="language" id="language"
        onChange={handleLang}>
        {languageOptions}
      </select>

      <input id="button" type="submit" value="Search!" />
    </form>
  )
}

export default SearchInput