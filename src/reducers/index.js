/* jshint -W138 */
import { combineReducers } from 'redux'
import * as types from '../constants'

const user = (state = {}, action) => {
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

const tracks = (state = { recentTracks: [] }, action) => {
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

const nowPlaying = (state = { track: null, isNowPlaying: false, lyrics: null }, action) => {
  switch (action.type) {

    case types.REQ_LYRICS:
      return {...state, isFetching: true}

    case types.NOW_PLAYING_START:
      return {...state, track: action.track, isNowPlaying: true}

    case types.DISPLAY_LYRICS:
      return {...state, lyrics: action.lyrics, isFetching: false}

    case types.NOW_PLAYING_STOP:
      return {...state, track: null, isNowPlaying: false, isFetching: false, lyrics: null}

    case types.REMOVE_USER:
      return {...state, track: {}, isNowPlaying: false}

    default:
      return state
  }
}

export default combineReducers({
  user, tracks, nowPlaying
})
