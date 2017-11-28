// @flow
const constants = {
  BIRD_JUMP: 4.6,
  GRAVITY: 0.25,
  BIRD_RADIUS: 12,
  BIRD_ANIMATION: [0, 1, 2, 1],
  APP_WIDTH: 320,
  APP_HEIGHT: 480,
  BACKGROUND_SPRITE_WIDTH: 138 * 2,
  BACKGROUND_SPRITE_HEIGHT: 114 * 2,
  FOREGROUND_SPRITE_WIDTH: 111 * 2,
  FOREGROUND_SPRITE_HEIGHT: 56 * 2,
  PIPE_HEIGHT: 200 * 2,
  PIPE_WIDTH: 26 * 2,
  BIRD_WIDTH: 17 * 2,
  BIRD_HEIGHT: 12 * 2,
  STATE_SPLASH: 0,
  STATE_PLAYING: 1,
  STATE_GAME_OVER: 2,
  MIN_DISTANCE_FROM_PIPE_TO_FOREGROUND: 120,
  MIN_DISTANCE_BETWEEN_2_PIPE: 100,
  MIN_FRAME_TO_DISPLAY_PIPE: 100
};

export default constants;
