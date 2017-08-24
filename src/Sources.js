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
        // throw new Error("The news api doesnt seem available right now");
        console.log("The news api doesnt seem available right now");
        return;
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
              <div className="item item--plusminus" key={i}>
                <input type="checkbox" id={i + '-currentsourceswitch'} value={source.id} onChange={that.props.action} checked={that.props.selectedSources.includes(source.id) ? 'checked' : '' } />
                <label htmlFor={i + '-currentsourceswitch'}>{source.name}</label>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

export default Sources;