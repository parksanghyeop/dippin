import { createSlice } from '@reduxjs/toolkit';

export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

const iframeReducer = createSlice({
  name: 'iframeReducer',
  initialState: {
    playstate: -1,
    progress: { time: 0, duration: 60 },
    playlist: [],
    playlistindex: -1,
    playerinited: false,
  },
  reducers: {
    setPlayState(state, { payload: playstate }) {
      return { ...state, playstate: playstate };
    },
    setProgress(state, { payload: progress }) {
      return { ...state, progress: progress };
    },
    setPlayList(state, { payload: playlist }) {
      return { ...state, playlist };
    },
    setPlayListIndex(state, { payload: playlistindex }) {
      return { ...state, playlistindex };
    },
    setPlayerInited(state, { payload: playerinited }) {
      return { ...state, playerinited };
    },
  },
});

export const { setPlayState, setProgress, setPlayList, setPlayListIndex, setPlayerInited } =
  iframeReducer.actions;
export default iframeReducer.reducer;
