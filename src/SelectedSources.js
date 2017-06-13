import React, { Component } from 'react';
import './App.css';

class SelectedSources extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      selectedSources: this.props.selectedSources
    }
  }

  // To do: move to functions file
  sortAlpha = (array) => {
    let stateAlpha = array;
    stateAlpha = stateAlpha.sort();
    this.setState = {
      selectedSources: stateAlpha
    }
  }


  componentWillUpdate = () => {
    this.sortAlpha(this.props.selectedSources)
  }

  componentWillMount = () => {
    this.sortAlpha(this.props.selectedSources)
  }

  render() {
    const that = this;

    return (
      <div className="sources-list sources-list--left">
        <form id="selectedsources">
          {that.state.selectedSources.map(function(source,i){
            return (
              <div className="item item--simple" key={i}>
                <input type="checkbox" id={i + '-selectedsourceswitch'} value={source} onChange={that.props.action} checked={that.props.currentsource.includes(source) ? 'checked' : '' } />
                <label htmlFor={i + '-selectedsourceswitch'}>{source.replace(/-/g, ' ')}</label>
              </div>
            );
          })}
        </form>
        <div className="poweredby">powered by <a href="https://newsapi.org">newsapi.org</a></div>
      </div>
    );
  }
}

export default SelectedSources;