/* eslint-disable */

import fetch from 'isomorphic-fetch'
import { infoURL, recentTracksURL, lyricsURL, FEEDBACK_URL, newTracksReq } from '../constants'
import * as action from './actionCreator'

export const hideMenu = (res) => (dispatch) => dispatch(action.hideMenu(res))
export const showMenu = (res) => (dispatch) => dispatch(action.showMenu(res))

export const nextPage = () => (dispatch, getState) => {
  dispatch(action.requestRecentTracks())
  const { nowPlaying, user } = getState()
  dispatch(action.nextPage(nowPlaying.page))
  dispatch(getTracks(user.user.name))
}

export const prevPage = () => (dispatch, getState) => {
  const { nowPlaying, user } = getState()
  if(nowPlaying.page <= 1) return
  dispatch(action.requestRecentTracks())
  dispatch(action.prevPage(nowPlaying.page))
  dispatch(getTracks(user.user.name))
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

export const checkNewTracks = () => (dispatch, getState) => {
  const { name } = getState().user.user
  const tracks = getState().tracks.recentTracks
  const lastTrack = (tracks && tracks[0].date) ? tracks[0] : tracks[1].date
  const nowPlayingTrack = getState().nowPlaying.track || false

  return fetch(newTracksReq(name))
    .then(res => res.json())
    .then(res => {
      const lastNewTrack = res.recenttracks.track[0].date ? res.recenttracks.track[0] : res.recenttracks.track[1].date
      const nowPlayingN = res.recenttracks.track[0]['@attr'] ? res.recenttracks.track[0] : false
      if(nowPlayingTrack.name !== nowPlayingN.name){
        dispatch(getTracks(name))
      } else if(lastTrack.uts !== lastNewTrack.uts){
        dispatch(getTracks(name))
      }
    })
}

export const getTracks = (username) => (dispatch, getState) => {
  const { page } = getState().nowPlaying
  return fetch(recentTracksURL(username, page))
  .then(res => res.json())
  .then(res => {
    const tracks = res.recenttracks.track
    const { nowPlaying, lyricsDisplay } = getState()

    dispatch(action.getRecentTracks(tracks))
    // if there's a track being played atm
    if (tracks[0]['@attr']) {
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

export const searchForUser = (username) => (dispatch) => {
  dispatch(action.requestUser())
  return fetch(infoURL(username))
  .then(res => res.json())
  .then(res => {
    if(res.error && res.error === 6) dispatch(action.searchUserFail())
    else {
      dispatch(action.searchUserSucc(res.user))
      localStorage.setItem('user', res.user.name)
      dispatch(action.requestRecentTracks())
      dispatch(getTracks(username))
    }
  })
}

export const removeUser = () => (dispatch) => {
  localStorage.removeItem('user')
  dispatch(action.removeUserr())
}

export const sendFeedback = (data) => (dispatch, getState) => {
  let formData = new FormData(data);
  formData.append('uid', getState().user.user.name)

  return fetch(FEEDBACK_URL, {
    method: "POST",
    body: formData
  })
}