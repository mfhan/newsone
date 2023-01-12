import React from 'react';
import '../App.css';
import axios from 'axios';
import badSources from '../services/badsources';
import badIntlSources from '../services/badintlsources';
import SearchInput from './SearchInput';

export async function makeUSNewsCall(usQueryString, setNewsList) {
  axios.get(usQueryString)
    .then((response) => {
      console.log('this is the US response', response)
      const resultList = response.data.articles
        .filter((element) => !badSources.includes(element.name))
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
          console.log('sourcename: ', searchItem.name);
          console.log('summary: ', searchItem.title);
          return searchItem;
        });

      setNewsList(resultList);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

//const [resultWorldList, setWorldList] = useState([]);
//const [translatedList, setTranslatedList] = useState([]);

export async function makeWorldCall(worldQueryString, setWorldList, setTranslatedList) {
  axios.get(worldQueryString)
    .then((response) => {
      console.log('this is the World response', response)
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
      //the list that was created via filter and map goes back to MAIN via the setter 
      translateText(resultWorldList, setTranslatedList);
      //takes TWO params in order to SET the translated list
      //which MUST be passed due to SCOPE 
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export async function translateText(results, setTranslatedList) {
  const titles = results.map((item) => item.title);
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
  //setTranslatedList is now simplified to response.data.translations b/c the mapping happens via NewsList
  setTranslatedList(response.data.translations);
};


