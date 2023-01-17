import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import {
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import SearchInput from './SearchInput';
import IntlSources from '../services/intlsources';
import badIntlSources from '../services/badintlsources';
import usSources from '../services/ussources';
import badSources from '../services/badsources';
import { makeUSNewsCall, makeWorldCall } from './Utils';
import NewsList from './NewsList';

function Main(props) {
  console.log("props from Main: ", props)
  //let searchWord = props.searchWord 

  //useState returns an array composed of the search word and the function that will manipulate it 
  const [searchWord, setSearchWord] = useState("");
  const [submitCompleted, setSubmitCompleted] = useState(false)
  const [resultNewsList, setNewsList] = useState([])
  const [resultWorldList, setWorldList] = useState([])
  const [translatedList, setTranslatedList] = useState([])
  const [selectedLanguage, setLanguage] = useState('')
  const [newsClass, setNewsClass] = useState("");

  const usQueryString = `https://newsapi.org/v2/everything?q=${searchWord
    }&domains=${usSources
    }&sortBy=publishedAt&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6`;

  const worldQueryString = `https://newsapi.org/v2/everything?q=${searchWord
    }&domains=${IntlSources
    }&language=${selectedLanguage
    }&sortBy=popularity&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6`;

  useEffect(() => {
    console.log('submitCompleted:', submitCompleted)
    if (submitCompleted) {
      console.log('this is USCall')
      makeUSNewsCall(usQueryString, setNewsList);
      console.log('this is WorldCall')
      makeWorldCall(worldQueryString, setWorldList, setTranslatedList, setSubmitCompleted);
      //MUST pass these arguments even though they were ALREADY expressed in Utils
      setNewsClass("news-list");
    }
  }, [submitCompleted])

  // const setClass = submitCompleted
  //   ? "news-list"
  //   : "";
  // setClass was dependent on submitCompleted, but in order for it to not be affected by the submitCompleted = false that happens at the end of the World Call, we need to declare it using useState and tying it to useEffect 
  //useState 
  //  const [newsClass, setNewsClass] = useState("");
  //then call it in the useEffect 
  //then use newsClass in the return

  return (
    <div>
      <div className="searchWord">
        {/* <h2>Search the news</h2> */}
        <div className="intro">
          <h1 className="title">
            How Countries See The News
          </h1>
          <div className="invitation">
            <span>
              Countries around the world see and frame the news differently.
              <br /> Type a search word to compare angles and points of view.
            </span>
          </div>
        </div>
        <SearchInput
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          setLanguage={setLanguage}
          setSubmitCompleted={setSubmitCompleted}
        />
      </div>

      <div className="container">
        <NewsList
          addClass={`us-${newsClass}`}
          newsList={resultNewsList}
        />
        <NewsList
          addClass={`world-${newsClass}`}
          newsList={resultWorldList}
        />
        <NewsList
          addClass={`translated-${newsClass}`}
          newsList={translatedList}
        />
      </div>
    </div>
  );
}

export default Main;
