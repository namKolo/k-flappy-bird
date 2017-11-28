import React, { Component } from 'react';

import type { Sprite } from '../../model';

type Props = {
  sprite: Sprite,
  onClick: () => void,
  children: React.Node
};

const buildSpriteTransform = (props: Props): string => {
  const { sprite } = props;
  if (!sprite) {
    return;
  }
  const { rotation, x, y } = sprite;

  return `translate(${x}px, ${y}px) ${rotation ? `rotate(${rotation}rad)` : ''}`;
};

export default class SpriteX extends Component {
  render() {
    const { onClick, children } = this.props;
    const styles = {
      position: 'absolute',
      transform: buildSpriteTransform(this.props)
    };
    return (
      <div style={styles} {...{ onClick }}>
        {children}
      </div>
    );
  }
}
