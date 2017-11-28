// @flow

import React from 'react';
import Sprite, { OkButtonSprite, SplashSprite, ReadyButtonSprite, GameOverSprite } from '../Sprite';
import consts from '../../constant';

type Props = {
  onClick: () => void
};

export const OkButton = (props: Props) => (
  <Sprite
    sprite={{ x: consts.APP_WIDTH / 2 - 40, y: consts.APP_HEIGHT - 340 }}
    onClick={props.onClick}
  >
    <OkButtonSprite />
  </Sprite>
);

export const Splash = () => (
  <Sprite sprite={{ x: consts.APP_WIDTH / 2 - 59, y: consts.APP_HEIGHT - 300 }}>
    <SplashSprite />
  </Sprite>
);

export const ReadyButton = () => (
  <Sprite sprite={{ x: consts.APP_WIDTH / 2 - 87, y: consts.APP_HEIGHT - 380 }}>
    <ReadyButtonSprite />
  </Sprite>
);

export const Gameover = () => (
  <Sprite sprite={{ x: consts.APP_WIDTH / 2 - 94, y: consts.APP_HEIGHT - 400 }}>
    <GameOverSprite />{' '}
  </Sprite>
);
