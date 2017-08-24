import React, { Component } from 'react';
import './App.css';
import LazyLoad from 'react-lazyload';
import moment from 'moment';
import PlaceholderComponent from './Placeholder';
import MasonryInfiniteScroller from 'react-masonry-infinite';

class App extends Component {
  
  constructor(props) {
    super();

    this.state = {
      stories: [],
      lastUpdated: new Date()
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
        // throw new Error("The news api doesnt seem available right now");
        console.log("The news api doesn't seem available right now");
        return;
      }
      return response.json();
    })
    .then(function(data) {

      data.articles.forEach(function(article){
        article['source'] = sourceid.replace(/-/g, ' ');
      });

      that.setState({
        stories: data.articles,
        lastUpdated: new Date()
      });

      window.scrollTo(0, 0);

      that.interval = setInterval(() => {
        that.forceUpdate();
      }, 30000);

    })
  }


  componentDidMount() {
    var that = this;
    this.fetchStories(that.props.currentsource);
  }


  render() {
    return (
      <div className="newslist-wrapper">
        <div className="lastupdated">last updated {moment(this.state.lastUpdated).fromNow()}</div>
        <ul className="newslist">
          <MasonryInfiniteScroller hasMore={this.state.hasMore} loadMore={() => this.setState({ elements: this.state.elements.push("Element") })}>

            {this.state.stories.map(function(story,i){
              return (
                <div className="newslist__item" key={i + '-' + story.url}>
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
                    <a className="newslist__link" href={story.url} target="blank">Read the full article...</a>
                  </div>
                </div>
              );
            })}

          </MasonryInfiniteScroller>
        </ul>
      </div>
    );
  }


  componentDidUpdate(prevProps) {
    var that = this;

    if (prevProps.currentsource === that.props.currentsource) {
      return false;
    } else {
      this.fetchStories(that.props.currentsource);
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


}

export default App;