import React from 'react';
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

//JAN 9 TO DO ITEMS
// create standalone querystring X 
// create utils folder with functions: news search call, translate call 
// have the utils make axios calls;
// Main decides what to do with the data and sets them into lists
// also assigns classes and therefore styling

function Main(props) {
  console.log('props from Main: ', props);
  // let searchWord = props.searchWord
  const [searchWord, setSearchWord] = useState('');
  // useState returns an array composed of the search word and the function that will manipulate it
  const [submitCompleted, setSubmitCompleted] = useState(false);
  const [resultNewsList, setNewsList] = useState([]);
  const [resultWorldList, setWorldList] = useState([]);
  const [translatedList, setTranslatedList] = useState([]);
  const [selectedLanguage, setLanguage] = useState('');


  const usQueryString = `https://newsapi.org/v2/everything?q=${searchWord
    }&domains=${usSources
    }&sortBy=publishedAt&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6`;


  const worldQueryString = `https://newsapi.org/v2/everything?q=${searchWord
    }&domains=${IntlSources
    }&language=${selectedLanguage
    }&sortBy=popularity&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6`;



  // const makeUSNewsCall = async () => {
  //   axios.get(usQueryString)
  //     .then((response) => {
  //       // console.log('this is the response', response)
  //       const resultList = response.data.articles
  //         .filter((element) => !badSources.includes(element.name))
  //         .map((d, i) => {
  //           const searchItem = {
  //             title: d.title,
  //             url: d.url,
  //             image: d.urlToImage,
  //             summary: d.description,
  //             id: d.source.id,
  //             name: d.source.name,
  //             icon: 'http://www.geonames.org/flags/x/us.gif',
  //           };
  //           console.log('sourcename: ', searchItem.name);
  //           console.log('summary: ', searchItem.title);
  //           return searchItem;
  //         });

  //       setNewsList(resultList);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };


  const makeWorldCall = async () => {
    axios.get(worldQueryString)
      .then((response) => {
        // console.log('this is the response', response)
        const resultWorldList = response.data.articles
          .filter((element) => !badIntlSources.includes(element.name))
          .map((d, i) => {
            const searchItem = {
              title: d.title,
              url: d.url,
              image: d.urlToImage,
              summary: d.description,
              id: d.source.id,
              name: d.source.name,
              icon: 'http://www.geonames.org/flags/x/us.gif',
            };
            console.log('intl sourcename: ', searchItem.name);
            console.log('intl summary: ', searchItem.title);
            return searchItem;
          });

        setWorldList(resultWorldList);
        translateText(resultWorldList);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const translateText = async (results) => {
    const titles = results.map((item) => item.title);
    console.log('titles:', titles);

    let textStr = '';
    for (const title of titles) {
      textStr += `text=${title}&`;
    }
    console.log('textStr:', textStr);
    const response = await axios
      .get(`https://api-free.deepl.com/v2/translate?${textStr}`, {
        params: {
          auth_key: '9796d421-225e-4133-0a9f-bf912f507cd1:fx',
          target_lang: 'EN',
        },
      });
    console.log('response.data from translateText:', response.data);

    setTranslatedList(
      response.data.translations.map((d, i) => (
        <li className="news-item" key={i}>
          {d.text}
          {' '}
          {d.detected_source_language}
          <br />
        </li>
      )),
    );
  };

  useEffect(() => {
    if (submitCompleted) {
      console.log('this is USCall');
      makeUSNewsCall(usQueryString, setNewsList);
      makeWorldCall();
    }
  }, [submitCompleted]);

  const finalNewsList = resultNewsList.map((newsItem, i) => (
    <li className="news-item" key={i}>
      {newsItem.title}
      <a href={newsItem.url}>Link</a>
      {' '}
      <br />
    </li>
  ));
  console.log('resultNewsList: ', resultNewsList);

  const finalWorldList = resultWorldList.map((newsItem, i) => (
    <li className="news-item" key={i}>
      {newsItem.title}
      <a href={newsItem.url}>Link</a>
      {' '}
      <br />
    </li>
  ));
  console.log('resultWorldList: ', resultWorldList);

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
        {finalNewsList}
        <br />
        {finalWorldList}
        <br />
        {translatedList}
      </div>
    </div>
  );
}

export default Main;
