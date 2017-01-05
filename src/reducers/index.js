/* jshint -W138 */
import { combineReducers } from 'redux'


const user = (state = {}, action) => {
  switch (action.type) {

    case 'START_USER_SEARCH':
      return {...state, isLoading: true, userErr: false}

    case 'SEARCH_USER_SUCCESS':
      return {...state, isLoading: false, user: action.user}

    case 'SEARCH_USER_FAIL':
      return {...state, isLoading: false, userErr: true}

    case 'REMOVE_USER':
      return {...state, user: {}}

    default:
      return state

  }
}

const tracks = (state = { recentTracks: [] }, action) => {
  switch (action.type) {

    case 'REQ_RECENT_TRACKS':
      return {...state, isFetching: true}

    case 'GET_RECENT_TRACKS':
      return {...state, recentTracks: action.tracks, isFetching: false}

    case 'REMOVE_USER':
      return {...state, recentTracks: []}

    default:
      return state
  }
}

const nowPlaying = (state = { track: null, isNowPlaying: false }, action) => {
  switch (action.type) {
    case 'CHECK_NP':
      return {...state, tracks: action.tracks}

    case 'NOW_PLAYING':
      return {...state, track: action.track, isNowPlaying: true}

    case 'REMOVE_USER':
      return {...state, track: {}, isNowPlaying: false}

    default:
      return state
  }
}

export default combineReducers({
  user, tracks, nowPlaying
})
