import React, { Component } from 'react';
import './App.css';

class Sources extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      // selectedSources: ['bbc-news','cnn','google-news']
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


  // toggleChange = (event) => {
  //   // let sourcesArray = this.state.selectedSources;
  //   let selectedSourcesTemp = this.state.selectedSources;
    
  //   if (this.state.selectedSources.includes(event.target.value)) {
  //     var index = selectedSourcesTemp.indexOf(event.target.value)
  //     selectedSourcesTemp.splice(index,1);
  //   } else {
  //     selectedSourcesTemp.push(event.target.value);
  //   }

  //   this.setState({
  //     selectedSources: selectedSourcesTemp
  //   });

  // }


  render() {
    const that = this;

    return (
      <div className="sources">
        <form id="sources">
          {this.state.sources.map(function(source,i){
            return (
              <div className="source" key={i}>
                <div className="source__title">
                  {source.name} {source.id}
                </div>
                <div className="source__checkbox">
                  <input type="checkbox" id={i + '-switch'} value={source.id} onChange={that.props.action} checked={that.props.sources.includes(source.id) ? 'checked' : '' } />
                  <label htmlFor={i + '-switch'}>Toggle</label>
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