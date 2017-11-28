// @flow
import React from 'react';

import Sprite, { ForegroundSprite } from '../Sprite';
import type { Foreground as ForegroundModel } from '../../model';

type Props = {
  foreground: ForegroundModel
};

export default (props: Props) => {
  const { foreground } = props;
  return <Sprite sprite={foreground}>{<ForegroundSprite />}</Sprite>;
};
