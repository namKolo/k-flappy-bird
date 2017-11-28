// @flow
import React from 'react';

import Sprite, { BackgroundSprite } from '../Sprite';
import type { Background as BackgroundModel } from '../../model';

type Props = {
  background: BackgroundModel
};

export default (props: Props) => {
  const { background } = props;
  return <Sprite sprite={background}>{<BackgroundSprite />}</Sprite>;
};
