// @flow
import consts from '../../constant';
import createSprite from './createSprite';
import image from './game.png';

export { default } from './Sprite';
// generate background from image
export const BackgroundSprite = createSprite({
  imgPath: image,
  x: 0,
  y: 0,
  width: consts.BACKGROUND_SPRITE_WIDTH,
  height: consts.BACKGROUND_SPRITE_HEIGHT
});

// generate floor from image
export const ForegroundSprite = createSprite({
  imgPath: image,
  x: 138,
  y: 0,
  width: consts.FOREGROUND_SPRITE_WIDTH,
  height: consts.FOREGROUND_SPRITE_HEIGHT
});

// Generate bird from image
const birdPosition = {
  x: 156,
  y: 115,
  width: consts.BIRD_WIDTH,
  height: consts.BIRD_HEIGHT
};

export const BirdWithUpWingSprite = createSprite({
  imgPath: image,
  ...birdPosition
});

export const BirdWithBalancedWingSprite = createSprite({
  imgPath: image,
  ...birdPosition,
  y: birdPosition.y + birdPosition.height / 2 + 1
});

export const BirdWithDownWingSprite = createSprite({
  imgPath: image,
  ...birdPosition,
  y: birdPosition.y + 2 * birdPosition.height / 2 + 2
});

// Generate pipe
const pipePosition = {
  x: 251,
  y: 0,
  width: consts.PIPE_WIDTH,
  height: consts.PIPE_HEIGHT
};

export const PipeDownSprite = createSprite({
  imgPath: image,
  ...pipePosition
});

export const PipeUpSprite = createSprite({
  imgPath: image,
  ...pipePosition,
  x: pipePosition.x + pipePosition.width / 2
});

// Generate splash
export const SplashSprite = createSprite({
  imgPath: image,
  x: 0,
  y: 114,
  width: 58.5 * 2,
  height: 50 * 2
});

export const ReadyButtonSprite = createSprite({
  imgPath: image,
  x: 59,
  y: 155,
  width: 87 * 2,
  height: 22 * 2
});

export const OkButtonSprite = createSprite({
  imgPath: image,
  x: 119,
  y: 191,
  width: 40 * 2,
  height: 14 * 2
});

export const GameOverSprite = createSprite({
  imgPath: image,
  x: 59,
  y: 136,
  width: 94 * 2,
  height: 19 * 2
});
