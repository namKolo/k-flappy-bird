// recorder
import _ from 'lodash';
import store from './store';
import { replaceState } from './store/action';

function getInitialRecord() {
  return {
    history: [],
    isRecording: false
  };
}

let record = getInitialRecord();

export function start() {
  record = getInitialRecord();
}

export function finish() {
  record.isRecording = true;
}

export function save(state) {
  if (record.isRecording) {
    return;
  }
  const newState = _.cloneDeep(state);
  record.history.push(newState);
}

export function replay() {
  let { history } = record;
  let count = 0;
  const dispatchState = () => {
    if (count >= history.length) {
      return;
    }
    store.dispatch(replaceState(history[count]));
    count += 1;
    requestAnimationFrame(dispatchState);
  };
  dispatchState();
}
