import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginPage from './loginPage'
import BarLogged from './header/'
import RecentTracks from './recentTracks/RecentTracks'
import LBody from './lyricsBody/lyricsbody'
import { Segment, Grid } from 'semantic-ui-react'
import { searchForUser, checkNewTracks } from './../actions'
import { INTERVAL_TIME } from './../constants'
import Halogen from 'halogen'

class App extends Component {
  constructor(){
    super()
    this.state = { user: {} }
  }

  componentDidMount() {
    const { searchUser, checkNewTracks } = this.props
    const username = localStorage.getItem('user')
    if(username) searchUser(username)

    setInterval(()=> {
      if(this.state.user.name) checkNewTracks()
    }, INTERVAL_TIME)
  }

  componentWillReceiveProps({user}) {
    if(user.user) this.setState({ user: user.user })
  }

  render () {
    const { track, isFetching, isHidden } = this.props
    const { user } = this.state
    const isUser= Boolean(user.name)
    return !isUser ? <LoginPage /> : (
      <div>
        <div className='main-menu'>
          <BarLogged />
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

function mapStateToProps({ user, lyricsDisplay, nowPlaying}){
  const { isHidden } = nowPlaying
  const { track, isFetching } = lyricsDisplay

  return { user, track, isFetching, isHidden }
}

function mapDispatchToProps(dispatch){
  return {
    searchUser: (e) => dispatch(searchForUser(e)),
    checkNewTracks: ()     => dispatch(checkNewTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)