import React, {Component} from 'react'
import {connect} from 'react-redux'
import Bar from './header/HeadBar'
import BarLogged from './header/HeadBarLogged'
import RecentTracks from './recentTracks/RecentTracks'
import LBody from './lyricsBody/lyricsbody'
import Footer from './footer'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { searchForUser, nowPlaying, removeUser, checkTracks, showMenu, hideMenu } from './../actions'
import { refreshRecentTracks } from './../actions/actionCreator'
import { INTERVAL_TIME } from './../constants'
import Halogen from 'halogen'
import Feedback from './Feedback'

class App extends Component {
  constructor(){
    super()
    this.state = { user: {}, isNowPlaying: false }
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    const { searchUser, checkTracks } = this.props
    const username = localStorage.getItem('user')
    if(username) searchUser(username)

    setInterval(()=> {
      if(this.state.user.name) checkTracks(this.state.user.name)
    }, INTERVAL_TIME)

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
    const { searchUser, removeUser, track, isFetching, isHidden, showMenu, hideMenu } = this.props
    const { isLoading, userErr } = this.props.user
    const { user } = this.state
    const isUser= Boolean(user.name)
    return (
      <div>
        <div className='main-menu'>
          {isUser && <BarLogged user={user} removeUser={removeUser} refresh={this.refresh} isHidden={isHidden} showMenu={showMenu} hideMenu={hideMenu} />}
          {!isUser && <Bar loading={isLoading} err={userErr} search={searchUser} /> }
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
          <Footer />
          <span className='footer-item left-item'>Made with <Icon color='blue' name='music' /></span>
          {isUser && <Feedback />}
        </Segment>
      </div>
    )
  }
}

function mapStateToProps({ user, nowPlaying, lyricsDisplay}){
  const { isNowPlaying, isHidden } = nowPlaying
  const { track, isFetching } = lyricsDisplay

  return { user, isNowPlaying, track, isFetching, isHidden }
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