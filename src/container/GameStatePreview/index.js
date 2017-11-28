import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Thanks idea from Flatris
const gridPattern = /\n([\s]+)"(bird|backgrounds|foregrounds)": ([\s\S]+?)(\]([\s]+)\],[\s]+")/g;

const prettifyGrid = (grid, indent) => {
  return grid
    .replace(new RegExp('\\[[\\s]+([0-9]+),[\\s\\n]+("#[a-z0-9]{6}")[\\s\\n]+\\]', 'g'), '$2')
    .replace(new RegExp('\\[\n' + indent + '    ', 'g'), '[ ')
    .replace(new RegExp(',\n' + indent + '    ', 'g'), ', ')
    .replace(new RegExp('\n' + indent + '  (\\]|$)', 'g'), ' $1');
};

const prettifyState = state => {
  return JSON.stringify(state, null, '  ').replace(
    gridPattern,
    (match, indent, key, grid, after) =>
      `\n${indent}"${key}": ${prettifyGrid(grid, indent)}${after}`
  );
};

const StyledPre = styled.pre`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Monaco, 'Lucida Console', monospace;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin: 0px 20px;
  height: 500px;
  overflow: scroll;
`;

const GameStatePreview = ({ state }) => <StyledPre>{prettifyState(state)}</StyledPre>;

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(GameStatePreview);
