/* jshint -W138 */
import { combineReducers } from 'redux'
import * as types from '../constants'

const initialState = {
  user: {},
  tracks: { recentTracks: [] },
  nowPlaying: { track: {}, isNowPlaying: false, isHidden: false, page: 1 },
  lyricsDisplay: { track: {}, lyrics: null, isFetching: false }
}

const user = (state = initialState.user, action) => {
  switch (action.type) {

    case types.START_USER_SEARCH:
      return {...state, isLoading: true, userErr: false}

    case types.SEARCH_USER_SUCCESS:
      return {...state, isLoading: false, user: action.user}

    case types.SEARCH_USER_FAIL:
      return {...state, isLoading: false, userErr: true}

    case types.REMOVE_USER:
      return {...state, user: {}}

    default:
      return state

  }
}

const tracks = (state = initialState.tracks, action) => {
  switch (action.type) {

    case types.REQ_RECENT_TRACKS:
    case types.REFRESH_RECENT_TRACKS:
      return {...state, isFetching: true}

    case types.GET_RECENT_TRACKS:
      return {...state, recentTracks: action.tracks, isFetching: false}

    case types.REMOVE_USER:
      return {...state, recentTracks: []}

    default:
      return state
  }
}

const nowPlaying = (state = initialState.nowPlaying, action) => {
  switch (action.type) {

    case types.NOW_PLAYING_START:
      return {...state, track: action.track, isNowPlaying: true}

    case types.NOW_PLAYING_STOP:
      return {...state, track: {}, isNowPlaying: false}

    case types.REMOVE_USER:
      return initialState.nowPlaying

    case types.HIDE_MENU:
      return {...state, isHidden: true}

    case types.SHOW_MENU:
      return {...state, isHidden: false}

    case types.GET_NEXT_PAGE:
      return {...state, page: action.page}

    case types.GET_PREV_PAGE:
      return {...state, page: action.page}

    default:
      return state
  }
}

const lyricsDisplay = (state = initialState.lyricsDisplay, action) => {
  switch (action.type) {

    case types.REQ_LYRICS:
      return {...state, lyrics: null, isFetching: true}

    case types.NOW_PLAYING_START:
    return {...state, track: action.track, lyrics: null, isNowPlaying: true, isFetching: true}

    case types.DISPLAY_LYRICS:
    case types.SWITCH_LYRICS:
      return {...state, track: action.track, lyrics: action.lyrics, isFetching: false}

    case types.LYRICS_NOT_FOUND:
      return {...state, lyrics: action.lyrics, isFetching: false}

    case types.REMOVE_USER:
      return initialState.lyricsDisplay
    default:
      return state
  }
}

export default combineReducers({
  user, tracks, nowPlaying, lyricsDisplay
})
