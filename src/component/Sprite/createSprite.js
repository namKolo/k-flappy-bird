// @flow
import React from 'react';

type Props = {
  imgPath: string,
  x: number,
  y: number,
  width: number,
  height: number
};

const createSprite = (props: Props) => () => {
  const { imgPath, x, y, width, height } = props;
  const styles = {
    backgroundImage: `url(${imgPath})`,
    backgroundPosition: `${x * -2}px ${y * -2}px`,
    width: width,
    height: height
  };
  return <div style={styles} />;
};

export default createSprite;
