const api_key = 'ef8a2cb943728b1ac275b43c9fb095ca'

export function requestUser(){
  return {
    type: 'START_USER_SEARCH'
  }
}

export function searchUserSucc(user) {
  return {
    type: 'SEARCH_USER_SUCCESS',
    user
  }
}

export function searchUserFail() {
  return {
    type: 'SEARCH_USER_FAIL'
  }
}

export function removeUserr() {
  return {
    type: 'REMOVE_USER'
  }
}

export function requestRecentTracks(){
  return {
    type: 'REQ_RECENT_TRACKS'
  }
}

export function getRecentTracks(tracks){
  return {
    type: 'GET_RECENT_TRACKS',
    tracks
  }
}

export function nowPlaying(track){
  return {
    type: 'NOW_PLAYING',
    track
  }
}

export function getURL(method, username, apiKey=api_key){
  return `http://ws.audioscrobbler.com/2.0/?user=${username}&method=${method}&api_key=${apiKey}&format=json&nowplaying=true&limit=10`
}