// @flow
import React, { Component } from 'react';

import {
  BirdWithUpWingSprite,
  BirdWithDownWingSprite,
  BirdWithBalancedWingSprite
} from '../Sprite';

import type { Bird as BirdModel } from '../../model';

import Sprite from '../Sprite';

type Props = {
  bird: BirdModel
};

export default class Bird extends Component<Props> {
  render() {
    const { bird } = this.props;
    let FinalBird;

    switch (bird.frame) {
      case 1:
      case 3:
        FinalBird = BirdWithBalancedWingSprite;
        break;
      case 2:
        FinalBird = BirdWithDownWingSprite;
        break;
      case 0:
      default:
        FinalBird = BirdWithUpWingSprite;
    }

    return <Sprite sprite={bird}>{<FinalBird />}</Sprite>;
  }
}
