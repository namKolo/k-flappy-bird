// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateFrame, runGame, flyUp, resetGame } from '../../store/action';
import consts from '../../constant';
import Background from '../../component/Background';
import Foreground from '../../component/Foreground';
import Bird from '../../component/Bird';
import Pipe from '../../component/Pipe';
import { Splash, ReadyButton, OkButton, Gameover } from '../../component/Button';

type Props = {
  updateFrame: typeof updateFrame,
  runGame: typeof runGame,
  resetGame: typeof resetGame,
  flyUp: typeof flyUp,
  gameState: Object
};

class Game extends Component<Props> {
  requestAnimationFrameId: number;

  componentDidMount = () => {
    this.requestAnimationFrameId = window.requestAnimationFrame(this.handleUpdateFrame);
    document.addEventListener('mousedown', this.handleMouseDown);
  };

  componentWillReceiveProps(nextProps: Props) {
    const { gameState } = nextProps;
    const { currentState } = gameState;

    if (currentState === consts.STATE_GAME_OVER && this.requestAnimationFrameId) {
      window.cancelAnimationFrame(this.requestAnimationFrameId);
    }
  }

  handleUpdateFrame = () => {
    this.props.updateFrame();
    const { currentState } = this.props.gameState;
    if (currentState !== consts.STATE_GAME_OVER) {
      this.requestAnimationFrameId = window.requestAnimationFrame(this.handleUpdateFrame);
    }
  };

  handleGameRun = () => {
    this.props.runGame();
  };

  handleGameReset = () => {
    this.props.resetGame();
    this.requestAnimationFrameId = window.requestAnimationFrame(this.handleUpdateFrame);
  };

  handleMouseDown = () => {
    const { gameState } = this.props;
    const currentState = gameState.currentState;
    if (currentState === consts.STATE_SPLASH) {
      this.props.runGame();
      this.props.flyUp();
    } else if (currentState === consts.STATE_PLAYING) {
      this.props.flyUp();
    }
  };

  render() {
    const style = {
      width: consts.APP_WIDTH,
      height: consts.APP_HEIGHT,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#70C5CF',
      border: '1px solid black'
    };
    const { gameState } = this.props;
    const { backgrounds, foregrounds, bird, currentState, pipes } = gameState;

    return (
      <div {...{ style }}>
        {backgrounds.map(bg => <Background background={bg} key={bg.id} />)}
        {pipes.map(pipe => <Pipe pipe={pipe} key={pipe.id} />)}
        <Bird {...{ bird }} />
        {foregrounds.map(fg => <Foreground foreground={fg} key={fg.id} />)}
        {currentState === consts.STATE_SPLASH && (
          <div>
            <Splash />
            <ReadyButton />
          </div>
        )}
        {currentState === consts.STATE_GAME_OVER && (
          <div>
            <Gameover />
            <OkButton onClick={this.handleGameReset} />{' '}
          </div>
        )}
      </div>
    );
  }
}

const hoc = connect(
  state => ({
    gameState: state
  }),
  { updateFrame, runGame, flyUp, resetGame }
);
export default hoc(Game);
