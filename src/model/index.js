// @flow
export type Sprite = {
  rotation: number,
  x: number,
  y: number
};

export type GameObject = {
  id: string,
  x: number,
  y: number
};

export type Bird = GameObject & {
  frame: number,
  velocity: number,
  rotation: number
};

export type Pipe = GameObject & {
  type: 'UP' | 'DOWN'
};

export type Background = GameObject;

export type Foreground = GameObject;
