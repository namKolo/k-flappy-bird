// @flow
import { createStore } from 'redux';

import consts from '../constant';
import { createBird, createBackground, createForeground, createPipe } from '../util';
import type { Bird, Pipe, Background, Foreground } from '../model';
import { UPDATE_FRAME, RUN_GAME, FLY_UP, RESET_GAME, REPLACE } from './action';

type State = {
  currentState: number,
  bird: Bird,
  pipes: Array<Pipe>,
  frames: number,
  foregroundPosition: number,
  backgrounds: Array<Background>,
  foregrounds: Array<Foreground>
};

const createInitialState = (): State => ({
  currentState: consts.STATE_SPLASH,
  bird: createBird({ x: 60, y: 0 }),
  pipes: [],
  frames: 1,
  foregroundPosition: 0,
  backgrounds: [
    createBackground({
      x: 0,
      y: consts.APP_HEIGHT - consts.BACKGROUND_SPRITE_HEIGHT
    }),
    createBackground({
      x: consts.BACKGROUND_SPRITE_WIDTH,
      y: consts.APP_HEIGHT - consts.BACKGROUND_SPRITE_HEIGHT
    })
  ],
  foregrounds: [
    createForeground({
      x: 0,
      y: consts.APP_HEIGHT - consts.FOREGROUND_SPRITE_HEIGHT
    }),
    createForeground({
      x: consts.FOREGROUND_SPRITE_WIDTH,
      y: consts.APP_HEIGHT - consts.FOREGROUND_SPRITE_HEIGHT
    })
  ]
});

const initialState = createInitialState();

const getNewForegroundState = (state: State): State => {
  const { foregrounds, foregroundPosition } = state;

  foregrounds[0].x = foregroundPosition;
  foregrounds[1].x = foregroundPosition + consts.FOREGROUND_SPRITE_WIDTH;

  return {
    ...state,
    foregrounds
  };
};

const getNewBirdState = (state: State): State => {
  const { bird, frames } = state;
  let { currentState } = state;
  const birdAnimation = consts.BIRD_ANIMATION;
  bird.frame = (bird.frame + (frames % 10 === 0 ? 1 : 0)) % birdAnimation.length;

  if (currentState === consts.STATE_SPLASH) {
    bird.y = consts.APP_HEIGHT / 2 + 7 * Math.cos(frames / 10);
    bird.rotation = 0;
  } else {
    bird.velocity = bird.velocity + consts.GRAVITY;
    bird.y = bird.y + bird.velocity;
    const limit = consts.APP_HEIGHT - consts.FOREGROUND_SPRITE_HEIGHT - 10;
    // colision between bird and foreground
    if (bird.y >= limit) {
      bird.y = limit;
      bird.velocity = consts.BIRD_JUMP;
      if (currentState === consts.STATE_PLAYING) {
        currentState = consts.STATE_GAME_OVER;
      }
    }
    if (bird.velocity >= consts.BIRD_JUMP) {
      bird.frame = 1;
      bird.rotation = Math.min(Math.PI / 2, bird.rotation + 0.3);
    } else {
      bird.rotation = -0.3;
    }
  }

  return {
    ...state,
    bird,
    currentState
  };
};

const checkIfCollisionBetweenBirdAndPipes = (bird: Bird, pipe: Pipe): boolean => {
  const x = Math.min(Math.max(bird.x + consts.BIRD_WIDTH / 2, pipe.x), pipe.x + consts.PIPE_WIDTH);
  const y = Math.min(
    Math.max(bird.y + consts.BIRD_HEIGHT / 2, pipe.y),
    pipe.y + consts.PIPE_HEIGHT
  );

  const dx = bird.x + consts.BIRD_WIDTH / 2 - x;
  const dy = bird.y + consts.BIRD_HEIGHT / 2 - y;

  const d1 = dx * dx + dy * dy;
  const r = consts.BIRD_RADIUS * consts.BIRD_RADIUS;
  return r > d1;
};

const getPipeState = (state: State): State => {
  let { frames, pipes, currentState } = state;
  if (frames % consts.MIN_FRAME_TO_DISPLAY_PIPE === 0) {
    const yForUpPipe =
      consts.APP_HEIGHT -
      (consts.PIPE_HEIGHT +
        consts.FOREGROUND_SPRITE_HEIGHT +
        consts.MIN_DISTANCE_FROM_PIPE_TO_FOREGROUND +
        100 * Math.random());
    const yForDownPipe = yForUpPipe + consts.MIN_DISTANCE_BETWEEN_2_PIPE + consts.PIPE_HEIGHT;

    // Make it appear outside of game screen
    const x = consts.APP_WIDTH + 100;
    pipes.push(
      createPipe({ type: 'UP', x, y: yForUpPipe }),
      createPipe({
        type: 'DOWN',
        x: x,
        y: yForDownPipe
      })
    );
  }

  pipes.forEach(pipe => {
    const { bird } = state;
    const isOverlapped = checkIfCollisionBetweenBirdAndPipes(bird, pipe);

    if (isOverlapped) {
      currentState = consts.STATE_GAME_OVER;
    }

    pipe.x -= 2;
    if (pipe.x < -consts.PIPE_WIDTH) {
      pipes.splice(0, 2);
    }
  });

  return {
    ...state,
    currentState,
    pipes
  };
};

function gaming(state = initialState, action) {
  switch (action.type) {
    case RUN_GAME: {
      return {
        ...state,
        currentState: consts.STATE_PLAYING
      };
    }

    case RESET_GAME: {
      return {
        ...createInitialState(),
        currentState: consts.STATE_PLAYING
      };
    }

    case FLY_UP: {
      const { bird } = state;
      bird.velocity = bird.velocity - consts.BIRD_JUMP;
      return {
        ...state,
        bird
      };
    }

    case UPDATE_FRAME: {
      let { frames, foregroundPosition, currentState } = state;
      let newState = state;
      frames = frames + 1;
      foregroundPosition = (foregroundPosition - 2) % 14;
      newState = {
        ...state,
        frames,
        foregroundPosition
      };
      newState = getNewForegroundState(newState);
      newState = getNewBirdState(newState);

      if (currentState === consts.STATE_PLAYING) {
        newState = getPipeState(newState);
      }

      return newState;
    }
    case REPLACE: {
      const { state: newState } = action;
      return newState;
    }

    default:
      return state;
  }
}

export default createStore(
  gaming,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
