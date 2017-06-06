import React, { Component } from 'react';
import './App.css';
import babelpolyfill from 'babel-polyfill';
import SelectedSources from './SelectedSources';
import Sources from './Sources';
import Newslist from './Newslist';

class App extends Component {
  
  constructor(props) {
    super();
  
    this.handler = this.currentSourceHandler.bind(this);

    this.state = {
      selectedSources: ['bbc-news','cnn','google-news'],
      currentSource: 'bbc-news'
    }
  }


  selectedSourcesHandler = (event) => {

    const selectedSources = this.state.selectedSources;

    if (this.state.selectedSources.includes(event.target.value)) {
      var index = selectedSources.indexOf(event.target.value)
      selectedSources.splice(index,1);
    } else {
      selectedSources.push(event.target.value);
    }

    console.log(selectedSources);

    this.setState({
      selectedSources: selectedSources
    })
  }


  currentSourceHandler = (event) => {

    // To Do: Move to utility function
    function deepCopy(obj) {
      if (obj !== undefined && obj !== null) {
        return JSON.parse(JSON.stringify(obj));
      }
      return null;
    }

    let currentSourceNew = deepCopy(event.target.value);

    this.setState({
      currentSource: currentSourceNew
    });

  }


  render() {
    return (
      <div className="App">
        <input type="checkbox" className="trigger" />
        <div className="sources">
          <label htmlFor="toggle-sources--checkbox" className="toggle-sources">Add / Remove Sources
          </label>
          <input id="toggle-sources--checkbox" className="toggle-sources toggle-sources--checkbox" type="checkbox" />
          <SelectedSources action={this.currentSourceHandler} selectedSources={this.state.selectedSources} currentsource={this.state.currentSource} />
          <Sources action={this.selectedSourcesHandler} selectedSources={this.state.selectedSources} />
        </div>
        <Newslist currentsource={this.state.currentSource} />
      </div>
    );
  }
}

export default App;
