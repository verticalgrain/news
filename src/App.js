import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LazyLoad from 'react-lazyload';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    var that = this;

    let sources = [
      'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=f2bd828e06724a59821444aaec0469dc',
      'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=f2bd828e06724a59821444aaec0469dc',
      'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=f2bd828e06724a59821444aaec0469dc'
    ]
    // var bbc = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=f2bd828e06724a59821444aaec0469dc';
    // var cnn = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=f2bd828e06724a59821444aaec0469dc';
    // var googlenews = 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=f2bd828e06724a59821444aaec0469dc';
    
    function custom_sort(a, b) {
      return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    }

    for (let source of sources) {
      fetch(source)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("The news api doesnt seem available right now");
        }
        return response.json();
      })
      .then(function(data) {
        let storiesarray = that.state.stories;
        storiesarray = storiesarray.concat(data.articles);
        
        // stories.push(data.articles);
        // console.log('normal:');
        console.log(storiesarray);
        // console.log('sorted;');
        // console.log(storiesarray.sort(custom_sort));

        that.setState({
          stories: storiesarray
        });
        
      })

    }

  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ul className="newslist">

          {this.state.stories.map(function(story){
            return (
              <article className="newslist__item" key={story.url}>
                <div className="newslist__title">{story.title}</div>
                <div className="newslist__date">{story.publishedAt}</div>
                <div className="newslist__description">{story.description}</div>
                <a className="newslist__link" href={story.url} target="blank">Link</a>
                <LazyLoad height={250}>
                  <img className="newslist__image" src={story.urlToImage} />
                </LazyLoad>
              </article>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
