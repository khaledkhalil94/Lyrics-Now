import React, {Component} from 'react'
import {connect} from 'react-redux'
import Bar from './header/HeadBar'
import BarLogged from './header/HeadBarLogged'
import RecentTracks from './recentTracks/RecentTracks'
import LBody from './lyricsBody/lyricsbody'
import { Segment, Grid } from 'semantic-ui-react'
import { searchForUser, nowPlaying, removeUser, checkTracks, showMenu, hideMenu } from './../actions'
import { refreshRecentTracks } from './../actions/actionCreator'
import Halogen from 'halogen'

class App extends Component {
  constructor(){
    super()
    this.state = { user: {}, isNowPlaying: false }
    this.refresh = this.refresh.bind(this)
  }

  componentWillMount() {
    const { searchUser, checkTracks } = this.props
    let username = localStorage.getItem('user')
    if(username) searchUser(username)
    setInterval(()=> {
      if(this.state.user.name) checkTracks(username)
    }, 10000)
  }

  refresh(username){
    const { checkTracks, requestRTracks } = this.props
    requestRTracks()
    checkTracks(username)
  }

  componentWillReceiveProps({user, isNowPlaying}) {

    this.setState({ isNowPlaying: isNowPlaying})
    if(user.user) this.setState({ user: user.user })
  }

  render () {
    const { searchUser, removeUser, track, isHidden, showMenu, hideMenu } = this.props
    const { isLoading, userErr } = this.props.user
    const { user } = this.state
    const isUser= Boolean(user.name)
    return (
      <div>
        <div className='main-menu'>
          {isUser
          ? <BarLogged user={user} removeUser={removeUser} refresh={this.refresh} isHidden={isHidden} showMenu={showMenu} hideMenu={hideMenu} />
          : <Bar loading={isLoading} err={userErr} search={searchUser} /> }
        </div>
        <Segment disabled={false} className='container body'>
          {false && <Halogen.ScaleLoader id='body-loader' size="36px" color='#26A65B' />}
          <Grid padded centered>
            <Grid.Row centered>
              <Grid.Column className='ui segment' width={isHidden ? 15 : 12}>
                  {track.name && <LBody />}
              </Grid.Column>
              { !isHidden && <Grid.Column width={4}>
                <div className='history'>
                  <RecentTracks switchLyrics={this.switchLyrics} />
                </div>
              </Grid.Column>}
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps({ user, nowPlaying, lyricsDisplay}){
  const { isNowPlaying, isHidden } = nowPlaying
  const { track } = lyricsDisplay

  return { user, isNowPlaying, track, isHidden }
}

function mapDispatchToProps(dispatch){
  return {
    searchUser: (e, m) => dispatch(searchForUser(e, m)),
    removeUser: ()     => dispatch(removeUser()),
    showMenu:   ()     => dispatch(showMenu()),
    hideMenu:   ()     => dispatch(hideMenu()),
    nowPlaying: (e)    => dispatch(nowPlaying(e)),
    checkTracks: (e)   => dispatch(checkTracks(e)),
    requestRTracks: () => dispatch(refreshRecentTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)