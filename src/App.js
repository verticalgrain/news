import React, { Component } from 'react';
import './App.css';
import babelpolyfill from 'babel-polyfill';
import SelectedSources from './SelectedSources';
import Sources from './Sources';
import Newslist from './Newslist';
import Slideout from 'slideout';

class App extends Component {
  
  constructor(props) {
    super();
  
    

    this.handler = this.currentSourceHandler.bind(this);

    // Fetch selectedSourcesLocal from localstorage
    const selectedSourcesLocalstorage = JSON.parse(localStorage.getItem( 'selectedSourcesLocal' )) || ['bbc-news','cnn','google-news','time','the-economist','reddit-r-all','national-geographic','hacker-news','fox-sports'];

    // Fetch currentSourceLocal from localstorage 
    const currentSourceLocalstorage = JSON.parse(localStorage.getItem( 'currentSourceLocal' )) || 'bbc-news';

    this.state = {
      selectedSources: selectedSourcesLocalstorage,
      currentSource: currentSourceLocalstorage,
      toggleSources: false,
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

    // Update selectedSources in localstorage
    localStorage.setItem( 'selectedSourcesLocal', JSON.stringify(selectedSources) );

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

    // Update currentSourceLocal in localstorage
    localStorage.setItem( 'currentSourceLocal', JSON.stringify(currentSourceNew) );

    this.slideout.close();

    this.setState({
      currentSource: currentSourceNew
    });

  }


  toggleSources = (e) => {
    
    // this.refs.sourcesList.getDOMNode().scrollTop += 10

    this.setState({
      toggleSources: e.target.checked
    })
 
  }

  render() {
    return (
      <div className="App">
        <nav className="sources" id="sources">
          <div className="logo">
            Lofi<br/>
            News
          </div>
          
          <input id="toggle-sources" type="checkbox" className="toggle-sources__input" onChange={this.toggleSources} checked={this.state.toggleSources} />
          <label htmlFor="toggle-sources" className="toggle-sources__label">{ this.state.toggleSources === true ? 'Back to your sources' : 'See all 70 sources' }</label>
          
          <SelectedSources action={this.currentSourceHandler} selectedSources={this.state.selectedSources} currentsource={this.state.currentSource} />
          <Sources action={this.selectedSourcesHandler} selectedSources={this.state.selectedSources} />
        </nav>
        <main id="panel">
          <Newslist currentsource={this.state.currentSource} />
        </main>
      </div>
    );
  }

  componentDidMount() {
    this.slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('sources'),
      'duration': 100,
      'padding': 270,
      'tolerance': 70,
      'easing': 'ease-in-out'
    });
  }
}

export default App;
