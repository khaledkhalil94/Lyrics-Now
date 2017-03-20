import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginPage from './loginPage'
import BarLogged from './header/'
import RecentTracks from './recentTracks/RecentTracks'
import LBody from './lyricsBody/lyricsbody'
import { Segment, Grid } from 'semantic-ui-react'
import { searchForUser, nowPlaying, removeUser, getTracks, showMenu, hideMenu, checkNewTracks } from './../actions'
import { refreshRecentTracks } from './../actions/actionCreator'
import { INTERVAL_TIME } from './../constants'
import Halogen from 'halogen'

class App extends Component {
  constructor(){
    super()
    this.state = { user: {} }
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    const { searchUser, checkNewTracks } = this.props
    const username = localStorage.getItem('user')
    if(username) searchUser(username)

    setInterval(()=> {
      if(this.state.user.name) checkNewTracks()
    }, INTERVAL_TIME)
  }

  refresh(username){
    const { getTracks, requestRTracks } = this.props
    requestRTracks()
    getTracks(username)
  }

  componentWillReceiveProps({user}) {
    if(user.user) this.setState({ user: user.user })
  }

  render () {
    const { removeUser, track, isFetching, isHidden, showMenu, hideMenu, isResHidden } = this.props
    const { user } = this.state
    const isUser= Boolean(user.name)
    return !isUser ? <LoginPage /> : (
      <div>
        <div className='main-menu'>
          <BarLogged user={user} removeUser={removeUser} refresh={this.refresh} isHidden={isHidden} isResHidden={isResHidden} showMenu={showMenu} hideMenu={hideMenu} />
        </div>
        <Segment className='container body'>
          <Grid padded centered>
            <Grid.Row centered>
              <Grid.Column id='main-body' width={isHidden ? 15 : 12}>
                {isFetching && !track.name && <Halogen.ScaleLoader className='halogen-loader' size="36px" color='#c7c7c7' />}
                {isUser && track.name && <LBody />}
              </Grid.Column>
              { !isHidden && <Grid.Column id='sidebar' width={4}>
                <RecentTracks switchLyrics={this.switchLyrics} />
              </Grid.Column>}
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps({ tracks, user, nowPlaying, lyricsDisplay}){
  const { isNowPlaying, isHidden } = nowPlaying
  const { track, isFetching } = lyricsDisplay
  const { isResHidden } = tracks

  return { user, isNowPlaying, track, isFetching, isHidden, isResHidden }
}

function mapDispatchToProps(dispatch){
  return {
    searchUser: (e) => dispatch(searchForUser(e)),
    removeUser: ()     => dispatch(removeUser()),
    checkNewTracks: ()     => dispatch(checkNewTracks()),
    showMenu:   (e)     => dispatch(showMenu(e)),
    hideMenu:   (e)     => dispatch(hideMenu(e)),
    nowPlaying: (e)    => dispatch(nowPlaying(e)),
    getTracks: (e)   => dispatch(getTracks(e)),
    requestRTracks: () => dispatch(refreshRecentTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)