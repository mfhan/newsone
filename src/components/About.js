import React from 'react';

function About(props) {
  console.log('this is About: props', props)
  return (<div >
    <p > Powered by < a href="https://newscatcherapi.com"
      target="_blank"> Newscatcher</a> and < a href="https://deepl.com"
        target="_blank" > Deepl Translator</a> </p>
  </div>
  );
}

export default About;