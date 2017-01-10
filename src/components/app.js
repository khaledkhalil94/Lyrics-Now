import React, {Component} from 'react'
import {connect} from 'react-redux'
import Bar from './common/header/HeadBar'
import BarLogged from './common/header/HeadBarLogged'
import RecentTracks from './common/RecentTracks'
import LBody from './common/lyricsbody'
import { Segment, Divider, Grid } from 'semantic-ui-react'
import { searchForUser, nowPlaying, removeUser, checkTracks } from './../actions'
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
    const { searchUser, removeUser } = this.props
    const { isLoading, userErr } = this.props.user
    const { user } = this.state
    const isUser= Boolean(user.name)
    return (
      <div>
        <div className='main-menu'>
          {isUser
          ? <BarLogged user={user} removeUser={ removeUser } refresh={ this.refresh } />
          : <Bar loading={isLoading} err={userErr} search={searchUser} /> }
        </div>
        <Segment disabled={false} className='container body'>
          {false && <Halogen.ScaleLoader id='body-loader' size="36px" color='#26A65B' />}
          <Grid padded centered>
            <Grid.Row centered>
              <Grid.Column width={12}>
                  {this.state.isNowPlaying && <LBody />}
              </Grid.Column>
              <Divider vertical></Divider>
              <Grid.Column width={4}>
                <div className='history'>
                  <RecentTracks switchLyrics={this.switchLyrics} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps({ user, nowPlaying}){
  const { isNowPlaying } = nowPlaying

  return { user, isNowPlaying }
}

function mapDispatchToProps(dispatch){
  return {
    searchUser: (e, m) => dispatch(searchForUser(e, m)),
    removeUser: ()     => dispatch(removeUser()),
    nowPlaying: (e)    => dispatch(nowPlaying(e)),
    checkTracks: (e)   => dispatch(checkTracks(e)),
    requestRTracks: () => dispatch(refreshRecentTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)