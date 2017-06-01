import React, { Component } from 'react';
import './App.css';
import babelpolyfill from 'babel-polyfill';
import Sources from './Sources';
import Newslist from './Newslist';

class App extends Component {
  
  constructor(props) {
    super();
  
    this.handler = this.handler.bind(this);

    this.state = {
      selectedSources: ['bbc-news','cnn','google-news']
    }
  }


  componentDidMount() {
    var that = this;
  }


  handler = (event) => {

    // To Do: Move to utility function
    function deepCopy(obj) {
      if (obj !== undefined && obj !== null) {
        return JSON.parse(JSON.stringify(obj));
      }
      return null;
    }

    let selectedSourcesTemp = deepCopy(this.state.selectedSources);
    
    if (this.state.selectedSources.includes(event.target.value)) {
      var index = selectedSourcesTemp.indexOf(event.target.value)
      selectedSourcesTemp.splice(index,1);
    } else {
      selectedSourcesTemp.push(event.target.value);
    }

    this.setState({
      selectedSources: selectedSourcesTemp
    });

  }


  render() {
    return (
      <div className="App">
        
        <Sources action={this.handler} sources={this.state.selectedSources} />
        <Newslist sources={this.state.selectedSources} />

      </div>
    );
  }
}

export default App;
