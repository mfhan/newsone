import React from 'react';
import '../App.css';

//take care of the logic BEFORE the RETURN statement and then just put the DISPLAY inside return
//JSX INSIDE logic is OK, logic inside FINAL return statement is no-no

const NewsList = (props) => {
    const styledList = props.newsList.length ? props.newsList.map((d, i) => {
        return (
            <div key={d.title || d.text} className='news-item'>
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

    console.log("props.addClass: ", props.addClass)
    return (<section className={props.addClass}>
        <div> {styledList} </div>
    </section>
    );
}
export default NewsList;