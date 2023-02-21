import React from 'react';
import '../App.css';
import axios from 'axios';
import badSources from '../services/badsources';
import badIntlSources from '../services/badintlsources';
import SearchInput from './SearchInput';

// //in Utils: 
// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });


export async function makeUSNewsCall(usQueryString, setNewsList) {
  axios.request(usQueryString)
    .then(function (response) {
      //console.log('this is the US response', response)
      const resultList = response.data.articles
        // .filter((element) => !badSources.includes(element.name))
        .map((d, i) => {
          const searchItem = {
            title: d.title,
            url: d.link,
            image: d.media,
            summary: d.summary,
            id: d._id,
            rights: d.rights,
            // name: d.source.name,
            date: d.published_date,
            icon: 'http://www.geonames.org/flags/x/us.gif',
          };
          // console.log('sourcename: ', searchItem.name);
          //console.log('summary from US Call: ', searchItem.title);
          return searchItem;
        });
      setNewsList(resultList);
      //console.log("response.data from US call", response.data);
    }).catch(function (error) {
      console.error(error);
    });
}

//OLD makeWorldCall: 
//const [resultWorldList, setWorldList] = useState([]);
//const [translatedList, setTranslatedList] = useState([]);

// export async function makeWorldCall(worldQueryString, setWorldList, setTranslatedList, setSubmitCompleted) {
//   axios.request(worldQueryString)
//     .then((response) => {
//       //console.log('this is the World response', response)
//       const resultWorldList = response.data.articles
//         .map((d, i) => {
//           const searchItem = {
//             title: d.title,
//             url: d.link,
//             image: d.media,
//             summary: d.summary,
//             id: d._id,
//             rights: d.rights,
//             // name: d.source.name,
//             date: d.published_date,
//             icon: 'http://www.geonames.org/flags/x/WorldFlags.png',
//           };
//           // console.log('sourcename: ', searchItem.name);
//           //console.log('summary from makeWorldCall: ', searchItem.title);
//           return searchItem;
//         });
//       setWorldList(resultWorldList);
//       console.log('response.data from WorldList', response.data);
//       translateText(resultWorldList, setTranslatedList, setSubmitCompleted);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };


export async function makeWorldCall(worldQueryString, setWorldList) {
  axios.request(worldQueryString)
    .then((response) => {
      //console.log('this is the World response', response)
      const resultWorldList = response.data.articles
        .map((d, i) => {
          const searchItem = {
            title: d.title,
            url: d.link,
            image: d.media,
            summary: d.summary,
            id: d._id,
            rights: d.rights,
            // name: d.source.name,
            date: d.published_date,
            icon: 'http://www.geonames.org/flags/x/WorldFlags.png',
          };
          // console.log('sourcename: ', searchItem.name);
          //console.log('summary from makeWorldCall: ', searchItem.title);
          return searchItem;
        });
      setWorldList(resultWorldList);
      console.log('resultWorldList ', resultWorldList);
      //console.log('response.data from WorldList', response.data);
      //translateText(resultWorldList, setTranslatedList, setSubmitCompleted);
      return resultWorldList;
    }).catch((error) => {
      console.log(error.message);
    });
};


// export async function translateText(resultWorldList, setTranslatedList, setSubmitCompleted) {
//   const finalWorldList = resultWorldList
//     .map(async (item) => {
//       let finalTitle = await axios
//         .get(`https://api-free.deepl.com/v2/translate?${item.title}`, {
//           params: {
//             auth_key: '9796d421-225e-4133-0a9f-bf912f507cd1:fx',
//             target_lang: 'EN',
//           },
//         });
//       // translateText(item.title);
//       let finalWorldListItem = {
//         title: finalTitle,
//         url: item.url,
//         rights: item.rights
//       }
//       return finalWorldListItem;
//     })

//   setTranslatedList(finalWorldList);
//   //setTranslatedList(response.data.translations);
//   setSubmitCompleted(false);
//   console.log('translatedList from translateText', finalWorldList)
// }

// const response = await axios
//   .get(`https://api-free.deepl.com/v2/translate?${completeStr}`, {
//     params: {
//       auth_key: '9796d421-225e-4133-0a9f-bf912f507cd1:fx',
//       target_lang: 'EN',
//     },
//   });



//Intermediate solution: 
// export async function translateText(results, setTranslatedList, setSubmitCompleted) {
//   const titles = results.map((item) => item.title);
//   console.log("LOOK HERE !!!! titles from translateText ", titles)
//   const rights = results.map((item) => item.rights);
//   console.log("LOOK HERE !!!! rights: ", rights)
//   let textStr = '';
//   let completeStr = '';
//   for (const title of titles) {
//     textStr += `text=${title}&`;
//     console.log('textStr from translateText', textStr);
//     for (const right of rights) {
//       completeStr = textStr += `text=${right}&`;
//       console.log('completeStr from translateText', completeStr);
//     }
//   }


//   console.log('textStr from translateText', textStr);
//   console.log('completeStr from translateText', completeStr);

// const response = await axios
//   .get(`https://api-free.deepl.com/v2/translate?${completeStr}`, {
//     params: {
//       auth_key: '9796d421-225e-4133-0a9f-bf912f507cd1:fx',
//       target_lang: 'EN',
//     },
//   });

//  console.log('response.data from translateText:', response.data);
//setTranslatedList is now simplified to response.data.translations b/c the mapping happens via NewsList
//   setTranslatedList(response.data.translations);
//   setSubmitCompleted(false);
// };


// original, limited solution: 
export async function translateText(results, setTranslatedList, setSubmitCompleted) {
  const titles = results.map((item) => item.title);
  let textStr = '';
  for (const title of titles) {
    textStr += `text=${title}&`;
  }
  console.log('textStr from translateText', textStr);
  const response = await axios
    .get(`https://api-free.deepl.com/v2/translate?${textStr}`, {
      params: {
        auth_key: '9796d421-225e-4133-0a9f-bf912f507cd1:fx',
        target_lang: 'EN',
      },
    });
  console.log('response.data from translateText:', response.data);
  //setTranslatedList is now simplified to response.data.translations b/c the mapping happens via NewsList
  //setTranslatedList(response.data.translations); 
  //PLUS url PLUS publisher name
  const finalListItems = results.map((item, i) => {
    return {
      title: response.data.translations[i].text,
      url: item.url,
      rights: item.rights
    }
  })

  setTranslatedList(finalListItems);
  console.log("finalListItems ", finalListItems)
  setSubmitCompleted(false);
};

