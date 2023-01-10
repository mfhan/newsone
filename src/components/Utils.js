import React from 'react';
import '../App.css';
import axios from 'axios';
import badSources from '../services/badsources';

export async function makeUSNewsCall(usQueryString, setNewsList) {
  axios.get(usQueryString)
    .then((response) => {
      // console.log('this is the response', response)
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
    // set it as response.data.translation, just an array
    response.data.translations
    // mapping will happen later in NewsList
  );
};
