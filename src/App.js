import React, { Component } from 'react';
import './App.css';
import UploadBox from './upload/UploadBox.js';

class App extends Component {
  componentDidMount(){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    } else {
      alert('The File APIs are not fully supported in this browser. Please use Chrome instead');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="panel">
            <div className="panel-heading"><strong>Simple Checkers Game Verifier MVP</strong></div>
            <UploadBox />
          </div>
        </div>
      </div>
    )

  }
}

export default App;
