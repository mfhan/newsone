import  { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios'
import SearchInput from './SearchInput'
import IntlSources from '../services/intlsources';
import badIntlSources from '../services/badintlsources';
import usSources from '../services/ussources';
import badSources from '../services/badsources';
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

    // const queryString = 'https://newsapi.org/v2/everything?q=' +
    //       searchWord +
    //       '&domains=' +
    //       usSources +
    //       '&sortBy=popularity&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6'

    const [resultNewsList, setNewsList] = useState([])

    const [resultWorldList, setWorldList] = useState([])    

    const [translatedList, setTranslatedList] = useState([])
   

 
const makeUSNewsCall = async() => {
    const queryString = 'https://newsapi.org/v2/everything?q=' +
          searchWord +
          '&domains=' +
          usSources +
          '&sortBy=publishedAt&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6'

        axios.get(queryString)
          .then( (response) =>{
        //console.log('this is the response', response)
        let resultList = response.data.articles
          .filter(element => !badSources.includes(element.name))
          .map((d, i) => {
            let searchItem = {
              title: d.title,
              url: d.url,
              image: d.urlToImage,
              summary: d.description,
              id: d.source.id,
              name: d.source.name,
              icon: 'http://www.geonames.org/flags/x/us.gif'
            }
            console.log("sourcename: ", searchItem.name);
            console.log("summary: ", searchItem.title);
            return searchItem;
          }) 
        
          setNewsList(resultList)
          //translateText(resultList);
        }) 
        .catch ((error) => {
        console.log(error.message);
      })
}


const makeWorldCall = async() => {
    const queryString = 'https://newsapi.org/v2/everything?q=' +
          searchWord +
          '&domains=' +
          IntlSources +
          '&sortBy=popularity&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6'

        axios.get(queryString)
          .then( (response) =>{
        //console.log('this is the response', response)
        let resultWorldList = response.data.articles
          .filter(element => !badIntlSources.includes(element.name))
          .map((d, i) => {
            let searchItem = {
              title: d.title,
              url: d.url,
              image: d.urlToImage,
              summary: d.description,
              id: d.source.id,
              name: d.source.name,
              icon: 'http://www.geonames.org/flags/x/us.gif'
            }
            console.log("intl sourcename: ", searchItem.name);
            console.log("intl summary: ", searchItem.title);
            return searchItem;
          }) 
        
          setWorldList(resultWorldList)
          translateText(resultWorldList);
        }) 
        .catch ((error) => {
        console.log(error.message);
      })
}

const translateText = async (results) => {
  let titles = results.map((item) => {
    return item.title
  })
console.log("titles:", titles)

let textStr = ""
for(let title of titles){
  textStr += "text=" + title +'&'
}
console.log("textStr:", textStr)
  const response = await axios 
    .get("https://api-free.deepl.com/v2/translate?"+textStr, {
      params: {
        auth_key: "9796d421-225e-4133-0a9f-bf912f507cd1:fx",
        target_lang: "EN"
      }
    });
    console.log("response.data from translateText:",response.data)

    setTranslatedList(
    response.data.translations.map((d, i) => { 
      return (
        <li className = 'news-item' key={i}>
           {d.text} &nbsp;{d.detected_source_language}<br></br>
         </li>
      )
    })  
    )
}

    useEffect( () => {
        if(submitCompleted){
        console.log('this is USCall')
          makeUSNewsCall();
          makeWorldCall();
          //MOVE translateText INTO worldCall
        }
    }, [submitCompleted])



    const finalNewsList = resultNewsList.map((newsItem, i) => {
      return (
        <li className = 'news-item' key={i}>
           {newsItem.title} 
            <a href={newsItem.url}>Link</a> <br></br>
         </li>
      )
    })
    console.log("resultNewsList: ", resultNewsList)

    const finalWorldList = resultWorldList.map((newsItem, i) => {
      return (
        <li className = 'news-item' key={i}>
           {newsItem.title} 
            <a href={newsItem.url}>Link</a> <br></br>
         </li>
      )
    })
    console.log("resultWorldList: ", resultWorldList)


    // const finalTranslatedList = resultWorldList.map((newsItem, i) => {
    //   return (
    //     <li className = 'news-item' key={i}>
    //        {newsItem.title} 
    //         <a href={newsItem.url}>Link</a> <br></br>
    //      </li>
    //   )
    // })
    // console.log("finalTranslatedList: ", finalTranslatedList)


    return (
      <div>
      <div className="searchWord">
        <h2>Search the news</h2>
          <SearchInput
            searchWord = {searchWord}
            setSearchWord = {setSearchWord}
            setSubmitCompleted = {setSubmitCompleted}
           />
      </div>
      <div >
        {finalNewsList}
<br/>
        {finalWorldList}
<br/>
        {translatedList}
      </div>
    </div>
    );
  }

export default Main