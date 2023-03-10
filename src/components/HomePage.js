import React from "react";
import "../App.css";

class Home extends React.Component {
  render() {
    return (
      <div className="intro">
        <h1 className="title">
          NEWSWINDOW <br /> How Different Countries See The News
        </h1>
        <div className="invitation">
          <span>
            Countries around the world see and frame the news differently.
            <br /> Type a search word to compare angles and points of view.
          </span>
        </div>
        <Form
          keyChange={this.props.keyChange}
          searchInput={this.props.searchInput}
          value={this.props.value}
        />
      </div>

      // <div className="container">
      //   <NewsList
      //     addClass={`us-${isButtonClicked}`}
      //     newsList={this.props.usSearchList}
      //   />
      //   <NewsList
      //     addClass={`gb-${isButtonClicked}`}
      //     newsList={this.props.gbSearchList}
      //   />
      //   <NewsList
      //     addClass={`world-${isButtonClicked}`}
      //     newsList={this.props.worldResultList}
      //   />
      // </div>
    );
  }
}

export default Home;
