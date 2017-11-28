// @flow
export const UPDATE_FRAME = 'UPDATE_FRAME';
export const RUN_GAME = 'RUN_GAME';
export const FLY_UP = 'FLY_UP';
export const RESET_GAME = 'RESET_GAME';
export const REPLAY = 'REPLAY';
export const REPLACE = 'REPLACE';

export const updateFrame = () => ({
  type: UPDATE_FRAME
});

export const runGame = () => ({
  type: RUN_GAME
});

export const flyUp = () => ({
  type: FLY_UP
});
export const resetGame = () => ({
  type: RESET_GAME
});

export const replay = () => ({
  type: REPLAY
});

export const replaceState = (state: Object) => ({
  type: REPLACE,
  state
});
