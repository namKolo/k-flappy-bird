// @flow
import type { Bird, Background, Pipe, Foreground } from '../model';

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const createGuid = (): string => {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const createBird = (props: { x: number, y: number }): Bird => {
  const { x, y } = props;
  return {
    id: createGuid(),
    x,
    y,
    frame: 0,
    velocity: 0,
    rotation: 0
  };
};

export const createPipe = (props: { type: 'UP' | 'DOWN', x: number, y: number }): Pipe => {
  const { type, x, y } = props;
  return {
    id: createGuid(),
    x,
    y,
    type
  };
};

export const createBackground = (props: { x: number, y: number }): Background => {
  const { x, y } = props;
  return {
    id: createGuid(),
    x,
    y
  };
};

export const createForeground = (props: { x: number, y: number }): Foreground => {
  const { x, y } = props;
  return {
    id: createGuid(),
    x,
    y
  };
};
