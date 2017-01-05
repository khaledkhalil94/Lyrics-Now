import fetch from 'isomorphic-fetch'
import { searchUserSucc, requestUser, searchUserFail, nowPlaying,
   getURL, getRecentTracks, removeUserr, requestRecentTracks } from './actionCreator'


export const searchForUser = (username, remember=false) => (dispatch) => {
  dispatch(requestUser())
  return fetch(getURL('user.getInfo', username))
  .then(res => res.json())
  .then(res => {
    if(res.error && res.error === 6) dispatch(searchUserFail())
    else {
      dispatch(searchUserSucc(res.user))
      if(remember) localStorage.setItem('user', res.user.name)
      dispatch(requestRecentTracks())
      getTracks(res.user.name, dispatch)
    }
  })
}

const getTracks = (username, dispatch) => {
  setTimeout(()=> {
    return fetch(getURL('user.getRecentTracks', username))
    .then(res => res.json())
    .then(res => {
      const tracks = res.recenttracks.track
      if (tracks[0]['@attr'] && tracks[0]['@attr'].nowplaying) dispatch(nowPlaying(tracks[0]))
      dispatch(getRecentTracks(tracks))
    })
  }, 1)
}

export const removeUser = () => (dispatch) => {
  localStorage.removeItem('user')
  dispatch(removeUserr())
}