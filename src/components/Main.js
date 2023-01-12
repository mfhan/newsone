import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import {
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import { makeUSNewsCall } from './Utils';
import SearchInput from './SearchInput';
import IntlSources from '../services/intlsources';
import badIntlSources from '../services/badintlsources';
import usSources from '../services/ussources';
import badSources from '../services/badsources';
import { makeUSNewsCall, makeWorldCall } from './Utils';
import NewsList from './NewsList';
import {
  Route,
  Navigate,
  Link,
} from "react-router-dom"

function Main(props) {
  console.log("props from Main: ", props)
  //let searchWord = props.searchWord 
  const [searchWord, setSearchWord] = useState("");
  //useState returns an array composed of the search word and the function that will manipulate it 

  const [submitCompleted, setSubmitCompleted] = useState(false)
  const [resultNewsList, setNewsList] = useState([])
  const [resultWorldList, setWorldList] = useState([])
  const [translatedList, setTranslatedList] = useState([])
  const [selectedLanguage, setLanguage] = useState('')

  const usQueryString = `https://newsapi.org/v2/everything?q=${searchWord
    }&domains=${usSources
    }&sortBy=publishedAt&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6`;

  const worldQueryString = `https://newsapi.org/v2/everything?q=${searchWord
    }&domains=${IntlSources
    }&language=${selectedLanguage
    }&sortBy=popularity&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6`;

  useEffect(() => {
    if (submitCompleted) {
      console.log('this is USCall')
      makeUSNewsCall(usQueryString, setNewsList);
      console.log('this is WorldCall')
      makeWorldCall(worldQueryString, setWorldList, setTranslatedList);
      //MUST pass these arguments even though they were expressed in Utils
    }
  }, [submitCompleted])


  return (
    <div>
      <div className="searchWord">
        <h2>Search the news</h2>
        <SearchInput
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          setLanguage={setLanguage}
          setSubmitCompleted={setSubmitCompleted}
        />
      </div>

      <div>
        <NewsList
          newsList={resultNewsList}
        />
        <NewsList
          newsList={resultWorldList}
        />
        <NewsList
          newsList={translatedList}
        />
      </div>
    </div>
  );
}

export default Main;
