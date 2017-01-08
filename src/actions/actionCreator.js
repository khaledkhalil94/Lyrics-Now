import * as types from '../constants'

export function requestUser(){
  return {
    type: types.START_USER_SEARCH
  }
}

export function searchUserSucc(user) {
  return {
    type: types.SEARCH_USER_SUCCESS,
    user
  }
}

export function searchUserFail() {
  return {
    type: types.SEARCH_USER_FAIL
  }
}

export function removeUserr() {
  return {
    type: types.REMOVE_USER
  }
}

export function requestRecentTracks(){
  return {
    type: types.REQ_RECENT_TRACKS
  }
}

export function refreshRecentTracks(){
  return {
    type: types.REFRESH_RECENT_TRACKS
  }
}

export function getRecentTracks(tracks){
  return {
    type: types.GET_RECENT_TRACKS,
    tracks
  }
}

export function startNowPlaying(track){
  return {
    type: types.NOW_PLAYING_START,
    track
  }
}

export function stopNowPlaying(){
  return {
    type: types.NOW_PLAYING_STOP
  }
}

export function requestLyrics(){
  return {
    type: types.REQ_LYRICS
  }
}

export function displayLyrics(lyrics){
  return {
    type: types.DISPLAY_LYRICS,
    lyrics
  }
}