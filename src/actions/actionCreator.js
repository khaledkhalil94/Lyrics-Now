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

export function displayLyrics(track, lyrics){
  return {
    type: types.DISPLAY_LYRICS,
    lyrics,
    track
  }
}

export function switchLyrics(track, lyrics){
  return {
    type: types.SWITCH_LYRICS,
    lyrics: lyrics.length > 1 ? lyrics : types.NO_LYRICS,
    track
  }
}

export function lyricsNotFound(){
  return {
    type: types.LYRICS_NOT_FOUND,
    lyrics: types.NO_LYRICS
  }
}

export function hideMenu(res=false){
  return {
    type: res ? types.HIDE_RES_MENU : types.HIDE_MENU,
    isHidden: true
  }
}

export function showMenu(res=false){
  return {
    type: res ? types.SHOW_RES_MENU : types.SHOW_MENU,
    isHidden: false
  }
}

export function nextPage(page){
  return {
    type: types.GET_NEXT_PAGE,
    page: ++page
  }
}

export function prevPage(page){
  return {
    type: types.GET_PREV_PAGE,
    page: --page
  }
}