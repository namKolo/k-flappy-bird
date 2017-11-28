import React, { Component } from 'react';
import './App.css';

import Game from './container/Game';
import GameStatePreview from './container/GameStatePreview';

class App extends Component {
  handleGameReplay = () => {
    this.props.record.replay();
  };

  render() {
    return (
      <div className="App">
        <Game />
        <button onClick={this.handleGameReplay}>replay</button>
        <GameStatePreview />
      </div>
    );
  }
}

export default App;
