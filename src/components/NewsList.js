import React from 'react';
import '../App.css';

// for refactor, discuss need for this -- probably NO) 
//take care of the logic BEFORE the return statement and then DISPLAY inside return
//JSX INSIDE logic is OK, logic inside FINAL return statement is no-no
//

const NewsList = (props) => {
    const styledList = props.newsList.length ? props.newsList.map((d, i) => {
        return (
            <div key={d.title} className='news-item'>
                {/* <img src={d.icon} alt="flag" /> */}
                <p> {d.title || d.text} </p>

                <p> {d.url ?
                    <a href={d.url} target='blank'> Link </a>
                    : ""}
                </p >
            </div>
        )
    }) :
        <div className={props.preClass} > </div>

    return (<section className={props.addClass}>
        <div> {styledList} </div>
    </section>
    );
}
export default NewsList;