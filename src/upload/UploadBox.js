import React, { Component } from 'react';
import Game from '../factory/Game.js';
import Reader from '../factory/Reader.js';
import Player from '../factory/Player.js';
import Result from '../result/Result.js';

import './UploadBox.css';
class UploadBox extends Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.dragHandler = this.dragHandler.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state.reader = new Reader ();
  }

  dragHandler(e){
    e.preventDefault();

  }
  handleDrop(e) {
    e.preventDefault();
    const component = this;
    this.setState({player: new Player ()});
    this.setState({game: new Game (8)})
    this.state.reader.readFile(e.dataTransfer.files[0]).then(function(result){
      const data = component.state.reader.decodeString(result);
      component.setState((prevState, props) => ({
        output: component.state.player.playGame(data, component.state.game, component.state.player)
      }));
    });
  }

  render(){
    return (
      <div className="panel-body">
        <p className="text-info">Drop a game file to see the result.</p>
        <div className="upload-drop-zone" id="drop-zone" onDragOver={(e)=>this.dragHandler(e)} onDrop={(e)=>this.handleDrop(e)}>
          Drag and Drop a .txt game file here
        </div>
        <Result output={this.state.output}/>

      </div>
    );
  }
}

export default UploadBox;
