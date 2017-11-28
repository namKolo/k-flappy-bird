// @flow
import React, { Component } from 'react';

import { PipeDownSprite, PipeUpSprite } from '../Sprite';
import type { Pipe as PipeModel } from '../../model';

import Sprite from '../Sprite';

type Props = {
  pipe: PipeModel
};

export default class Pipe extends Component<Props> {
  render() {
    const { pipe } = this.props;
    let FinalPipe;
    switch (pipe.type) {
      case 'DOWN':
        FinalPipe = PipeDownSprite;
        break;
      case 'UP':
      default:
        FinalPipe = PipeUpSprite;
    }

    return <Sprite sprite={pipe}>{<FinalPipe />}</Sprite>;
  }
}
