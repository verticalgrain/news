import React, { Component } from 'react';
import './App.css';
import LazyLoad from 'react-lazyload';
import moment from 'moment';
import babelpolyfill from 'babel-polyfill';
import PlaceholderComponent from './Placeholder';

class App extends Component {
  
  constructor(props) {
    super();

    this.state = {
      stories: []
    }
  }


  componentWillReceiveProps(nextProps) {
    var that = this;

    that.setState({
      // stories: [],
      sources: nextProps.sources
    })

    console.log('WillReceiveProps');

  }


  componentWillUpdate() {
    console.log('WillUpdate');
  }


  shouldComponentUpdate(nextProps) {
    var that = this;

    // console.log('old: ' + that.props.sources);
    // console.log('new: ' + nextProps.sources);

    if (that.props.sources === nextProps.sources) {
      return false;
    } else {
      return true;
    }

    console.log('ShouldUpdate');

  }


  render() {
    return (
      <ul className="newslist">
        {console.log('render')}
        {console.log('stories: ' + this.state.stories)}

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
    );
  }


  componentDidUpdate() {
    var that = this;

    console.log('DidUpdate');
    
    function custom_sort(a, b) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }

    let storiesarray = that.state.stories;

    for (let source of that.state.sources) {

      fetch('https://newsapi.org/v1/articles?source=' + source + '&sortBy=top&apiKey=f2bd828e06724a59821444aaec0469dc')
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("The news api doesnt seem available right now");
        }
        return response.json();
      })
      .then(function(data) {
        
        // data.articles.forEach(function(article){
        //   article['source'] = source.source;
        // });

        storiesarray = storiesarray.concat(data.articles);
        
        storiesarray = storiesarray.sort(custom_sort);
        
      })

    }

    console.log(storiesarray);

    that.setState({
      stories: storiesarray
    });

  }




}

export default App;
