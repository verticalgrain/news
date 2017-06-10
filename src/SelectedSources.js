import React, { Component } from 'react';
import './App.css';

class SelectedSources extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const that = this;

    return (
      <div className="sources-list sources-list--left">
        <form id="selectedsources">
          {this.props.selectedSources.map(function(source,i){
            return (
              <div className="item item--simple" key={i}>
                <input type="checkbox" id={i + '-selectedsourceswitch'} value={source} onChange={that.props.action} checked={that.props.currentsource.includes(source) ? 'checked' : '' } />
                <label htmlFor={i + '-selectedsourceswitch'}>{source.replace(/-/g, ' ')}</label>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

export default SelectedSources;