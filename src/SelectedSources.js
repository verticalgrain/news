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
              <div className="source" key={i}>
                <div className="source__title">
                  {source.replace(/-/g, ' ')}
                </div>
                <div className="source__checkbox">
                  <input type="checkbox" id={i + '-selectedsourceswitch'} value={source} onChange={that.props.action} checked={that.props.currentsource.includes(source) ? 'checked' : '' } />
                  <label htmlFor={i + '-selectedsourceswitch'}>Toggle</label>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

export default SelectedSources;