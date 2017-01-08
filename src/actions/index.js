import fetch from 'isomorphic-fetch'
import { infoURL, recentTracksURL, lyricsURL } from '../constants'
import * as action from './actionCreator'


export const searchForUser = (username, remember=false) => (dispatch) => {
  dispatch(action.requestUser())
  return fetch(infoURL(username))
  .then(res => res.json())
  .then(res => {
    if(res.error && res.error === 6) dispatch(action.searchUserFail())
    else {
      dispatch(action.searchUserSucc(res.user))
      if(remember) localStorage.setItem('user', res.user.name)
      dispatch(action.requestRecentTracks())
      dispatch(checkTracks(username))
    }
  })
}

export const checkTracks = (username) => (dispatch, getState) => {
  return fetch(recentTracksURL(username))
  .then(res => res.json())
  .then(res => {
    const tracks = res.recenttracks.track
    const { nowPlaying } = getState()
    dispatch(action.getRecentTracks(tracks))
    // if there's a track being played atm
    if (tracks.length === 11) {
      const track = tracks[0]
      if(!nowPlaying.isNowPlaying || (nowPlaying.track.mbid !== track.mbid)) {
        dispatch(action.startNowPlaying(track))
        dispatch(action.requestLyrics())
        dispatch(getLyrics(track))
      }
    } else if(nowPlaying.isNowPlaying) dispatch(action.stopNowPlaying())
  })
}

const getLyrics = (track) => (dispatch) => {
  return fetch(lyricsURL(track))
  .then(res => res.json())
  .then(res => {
    if(res.err == 'none') dispatch(action.displayLyrics(res.lyric))
  })
}

export const removeUser = () => (dispatch) => {
  localStorage.removeItem('user')
  dispatch(action.removeUserr())
}