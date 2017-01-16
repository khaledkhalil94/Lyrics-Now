import fetch from 'isomorphic-fetch'
import { infoURL, recentTracksURL, lyricsURL } from '../constants'
import * as action from './actionCreator'

export const hideMenu = () => (dispatch) => dispatch(action.hideMenu())
export const showMenu = () => (dispatch) => dispatch(action.showMenu())

export const nextPage = () => (dispatch, getState) => {
  dispatch(action.requestRecentTracks())
  const { nowPlaying, user } = getState()
  dispatch(action.nextPage(nowPlaying.page))
  dispatch(checkTracks(user.user.name))
}

export const prevPage = () => (dispatch, getState) => {
  const { nowPlaying, user } = getState()
  if(nowPlaying.page <= 1) return
  dispatch(action.requestRecentTracks())
  dispatch(action.prevPage(nowPlaying.page))
  dispatch(checkTracks(user.user.name))
}

export const switchLyrics = (track) => (dispatch, getState) => {
  const { lyricsDisplay, user } = getState()
  if(!track || (lyricsDisplay.track.name === track.name) || lyricsDisplay.isFetching) return
  dispatch(action.requestLyrics())
  return fetch(lyricsURL(track, user.user.name))
    .then(res => res.json())
    .then(res => {
      dispatch(action.switchLyrics(track, res.lyric))
    })
}

const getLyrics = (track, user) => (dispatch) => {
  return fetch(lyricsURL(track, user))
  .then(res => res.json())
  .then(res => {
    if(res.err === 'OK') dispatch(action.displayLyrics(track, res.lyric))
    else if(res.err === 'not found') dispatch(action.lyricsNotFound())
  })
}

export const checkTracks = (username) => (dispatch, getState) => {
  const { page } = getState().nowPlaying
  return fetch(recentTracksURL(username, page))
  .then(res => res.json())
  .then(res => {
    const tracks = res.recenttracks.track
    const { nowPlaying, lyricsDisplay } = getState()

    dispatch(action.getRecentTracks(tracks))
    // if there's a track being played atm
    if (tracks.length === 11) {
      const track = tracks[0]
      if(!nowPlaying.isNowPlaying || (nowPlaying.track.name !== track.name)) {
        dispatch(action.startNowPlaying(track))
        dispatch(action.requestLyrics())
        dispatch(getLyrics(track, username))
      }
    } else {
      if(nowPlaying.isNowPlaying) dispatch(action.stopNowPlaying())
      else if(!lyricsDisplay.lyrics) dispatch(switchLyrics(tracks[0], username))
    }
  })
}

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

export const removeUser = () => (dispatch) => {
  localStorage.removeItem('user')
  dispatch(action.removeUserr())
}