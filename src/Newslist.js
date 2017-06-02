import React, { Component } from 'react';
import './App.css';
import LazyLoad from 'react-lazyload';
import moment from 'moment';
import PlaceholderComponent from './Placeholder';

class App extends Component {
  
  constructor(props) {
    super();

    this.state = {
      stories: [],
    }

  }


  deepCopy = (obj) => {
    if (obj !== undefined && obj !== null) {
      return JSON.parse(JSON.stringify(obj));
    }
    return null;
  }


  fetchStories = (sourceid) => {
    var that = this;

    fetch('https://newsapi.org/v1/articles?source=' + sourceid + '&sortBy=top&apiKey=f2bd828e06724a59821444aaec0469dc')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("The news api doesnt seem available right now");
      }
      return response.json();
    })
    .then(function(data) {

      that.setState({
        stories: data.articles
      });

    })
  }


  componentDidMount() {
    var that = this;
    this.fetchStories(that.props.sources);
  }


  render() {
    return (
      <div className="newslist-wrapper">
        <ul className="newslist">
          {console.log('render')}
          {this.state.stories.map(function(story,i){
            return (
              <article className="newslist__item" key={i + '-' + story.url}>
                <div className="newslist__image">
                  <LazyLoad placeholder={<PlaceholderComponent />} height={250} offset={[700, 0]}>
                    <img src={story.urlToImage} alt={story.title} />
                  </LazyLoad>
                  <div className="newslist__source">{story.source}</div>
                </div>
                <div className="newslist__content">
                  <div className="newslist__title">{story.title}</div>
                  <div className="newslist__date">{moment(story.publishedAt).fromNow()}</div>
                  <div className="newslist__description">{story.description}</div>
                  <a className="newslist__link" href={story.url} target="blank">Link</a>
                </div>
              </article>
            );
          })}
        </ul>
      </div>
    );
  }


  componentDidUpdate(prevProps) {
    var that = this;

    if (prevProps.sources === that.props.sources) {
      return false;
    } else {
      this.fetchStories(that.props.sources);
    }

  }


}

export default App;