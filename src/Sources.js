import React, { Component } from 'react';
import './App.css';

class Sources extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
    }
  }

  componentDidMount() {
    var that = this;

    const api = 'https://newsapi.org/v1/sources';

    fetch(api)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("The news api doesnt seem available right now");
      }
      return response.json();
    })
    .then(function(data) {

      that.setState({
        sources: data.sources
      });
      
    })

  }


  render() {
    const that = this;

    return (
      <div className="sources-list sources-list--right">
        <form id="sources">
          {this.state.sources.map(function(source,i){
            return (
              <div className="source" key={i}>
                <div className="source__title">
                  {source.name}
                </div>
                <div className="source__checkbox">
                  <input type="checkbox" id={i + '-currentsourceswitch'} value={source.id} onChange={that.props.action} checked={that.props.selectedSources.includes(source.id) ? 'checked' : '' } />
                  <label htmlFor={i + '-currentsourceswitch'}>Toggle</label>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

export default Sources;