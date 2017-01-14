import React, {Component} from 'react'
import {connect} from 'react-redux'
import Bar from './header/HeadBar'
import BarLogged from './header/HeadBarLogged'
import RecentTracks from './recentTracks/RecentTracks'
import LBody from './lyricsBody/lyricsbody'
import { Segment, Grid } from 'semantic-ui-react'
import { searchForUser, nowPlaying, removeUser, checkTracks, showMenu, hideMenu } from './../actions'
import { refreshRecentTracks } from './../actions/actionCreator'

class App extends Component {
  constructor(){
    super()
    this.state = { user: {}, isNowPlaying: false }
    this.refresh = this.refresh.bind(this)
  }

  componentWillMount() {
    const { searchUser, checkTracks } = this.props
    let username = localStorage.getItem('user')
    if(username) {
      searchUser(username)
      setInterval(()=> {
        if(this.state.user.name) checkTracks(username)
      }, 10000)
    }
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
        <Segment className='container body'>
          <Grid padded centered>
            <Grid.Row centered>
              <Grid.Column id='main-body' width={isHidden ? 15 : 12}>
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