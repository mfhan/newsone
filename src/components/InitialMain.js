import  { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios'
import SearchInput from './SearchInput'
import badIntlSources from '../services/badintlsources';
import usSources from '../services/ussources';
import {
  Route,
  Navigate,
  Link,
} from "react-router-dom"

//1. Create a search window 
//2. be able to take the input - handleChange
//3. handleSubmit 

function Main(props) {
  console.log("props from Main: ", props)
    //let searchWord = props.searchWord 
    const [searchWord, setSearchWord] = useState("");
    //useState returns an array composed of the search word and the function that will manipulate it 
    
    const [submitCompleted, setSubmitCompleted] = useState(false) 

    const queryString = 'https://newsapi.org/v2/everything?q=' +
          searchWord +
          '&domains=' +
          usSources +
          '&sortBy=popularity&pageSize=3&apiKey=ded05226f8e9489888443d1b682e93c6'
    
//was: const queryString = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=ded05226f8e9489888443d1b682e93c6"

    const [resultNewsList, setNewsList] = useState([])

    const [translatedList, setTranslatedList] = useState(resultNewsList)
   

 //const makeNewsCall = async() => {

    useEffect( () => {

        if(submitCompleted){
        console.log('this is USCall')

        axios.get(queryString)
          .then( (response) =>{
        //console.log('this is the response', response)

        let resultList = response.data.articles
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
    }, [submitCompleted])



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
        target_lang: "FR"
      }
    });
    console.log("response.data:",response.data)

    setTranslatedList(
    response.data.translations.map((d, i) => { 
      return (
        <li className = 'news-item' key={i}>
           {d.text} 
         </li>
      )
    })  
    )

}

//translateText();



    const finalNewsList = resultNewsList.map((newsItem, i) => {
      return (
        <li className = 'news-item' key={i}>
           {newsItem.title} 
            <a href={newsItem.url}>Link</a> <br></br>
         </li>
      )
    })
console.log("resultNewsList: ", resultNewsList)


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
        {translatedList}
      </div>
    </div>
    );
  }

export default Main
