const HOST = process.env.NODE_ENV === 'development' ? 'localhost:1334' : 'lyricsnow.us/server' // auto host config

export const DEF_IMG = 'http://demo.joomlashine.com/joomla-templates/jsn_kido/pro/media/com_joomprofile/images/default.png'
export const DEF_TRACK_PIC = 'http://img2-ak.lst.fm/i/u/64s/c6f59c1e5e7240a4c0d427abd71f3dbb.png'
export const api_key = 'ef8a2cb943728b1ac275b43c9fb095ca'
export const FEEDBACK_URL = `http://${HOST}/feedback.php`

export const START_USER_SEARCH = 'START_USER_SEARCH'
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS'
export const SEARCH_USER_FAIL = 'SEARCH_USER_FAIL'
export const REMOVE_USER = 'REMOVE_USER'
export const REQ_RECENT_TRACKS = 'REQ_RECENT_TRACKS'
export const REQ_LYRICS = 'REQ_LYRICS'
export const REFRESH_RECENT_TRACKS = 'REFRESH_RECENT_TRACKS'
export const GET_RECENT_TRACKS = 'GET_RECENT_TRACKS'
export const NOW_PLAYING_START = 'NOW_PLAYING_START'
export const NOW_PLAYING_STOP = 'NOW_PLAYING_STOP'
export const DISPLAY_LYRICS = 'DISPLAY_LYRICS'
export const SWITCH_LYRICS = 'SWITCH_LYRICS'
export const LYRICS_NOT_FOUND = 'LYRICS_NOT_FOUND'
export const SHOW_MENU = 'SHOW_MENU'
export const HIDE_MENU = 'HIDE_MENU'
export const GET_NEXT_PAGE = 'GET_NEXT_PAGE'
export const GET_PREV_PAGE = 'GET_PREV_PAGE'
export const NO_LYRICS = 'Lyrics couldn\'t be found'

export function infoURL(username, apiKey=api_key){
  return `http://ws.audioscrobbler.com/2.0/?user=${username}&method=user.getInfo&api_key=${apiKey}&format=json`
}

export function recentTracksURL(username, page, limit=10, apiKey=api_key){
  return `http://ws.audioscrobbler.com/2.0/?user=${username}&method=user.getRecentTracks&api_key=${apiKey}&format=json&nowplaying=true&limit=${limit}&page=${page}&extended=1`
}

export function lyricsURL(track, user){
  const title = track.name.replace(/\s/g, '_')
  const artist = track.artist.name.replace(/\s/g, '_')
  return `http://${HOST}/?artist=${artist}&title=${title}&user=${user}`
}

export function removeActiveItems(){
  const nodes = document.querySelector('.recent-tracks a.active.item')
  if(nodes) nodes.className = 'item'
}