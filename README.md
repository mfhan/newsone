# NewsWindow: How the world frames the news

## WHAT IS IT? 
##NewsWindow is an app that allows readers to compare how events are reported in the US and the rest of the world — with headlines automatically translated into English. 
###The user is invited to type a search term, which will make two separate API calls to NewsCatcher API (https://docs.newscatcherapi.com/) and return three windows offering the top results in English and the selected language. 
THE TWIST: the "Rest-of-the-world" headlines are both in the selected language AND instantly translated into English -- because the app uses a second API that AUTOMATICALLY TRANSLATES the non-English headlines.

## EXAMPLE: 
###I want to know the difference in coverage of the Covid pandemic in English and other languages. I type "Covid", then select the language (nine currently, more to come). 
The first API call generates two columns: a column of news results in English, and a column of news headlines in the selected language. 
ANOTHER API call allows the articles in the "other language" column to be translated, populating the third column. 

## API info:
-- NEWS: I used NewsCatcher, "a data-as-a-service startup" that aims to "build the largest database of structured news articles published online" 
-- TRANSLATION: After many tribulations dealing with expensive services, I selected Deepl (https://www.deepl.com/translator)

##TRY IT OUT: https://newswindow.netlify.app/

### 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
