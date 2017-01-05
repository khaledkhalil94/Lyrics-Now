import React, {Component} from 'react'
import {connect} from 'react-redux'
import Bar from './common/header/HeadBar'
import BarLogged from './common/header/HeadBarLogged'
import RecentTracks from './common/RecentTracks'
import LBody from './common/lyricsbody'
import NowPlaying from './NowPlaying'
import { Segment, Divider, Grid } from 'semantic-ui-react'
import { searchForUser, nowPlaying, removeUser } from './../actions'
import Halogen from 'halogen'

class App extends Component {
  constructor(){
    super()
    this.state = { user: {}, isNowPlaying: false }
  }

  componentWillMount() {
    const { searchUser } = this.props
    let username = localStorage.getItem('user')
    if(username) searchUser(username)
  }

  componentWillReceiveProps({user, isNowPlaying}) {

    this.setState({ isNowPlaying: isNowPlaying})
    if(user.user) this.setState({ user: user.user })
  }

  render () {
    const { searchUser, recentTracks, removeUser, isFetching, track } = this.props
    const { isLoading, userErr } = this.props.user
    const { user, isNowPlaying } = this.state
    const isUser= Boolean(user.name)

    return (
      <div>
        <div className='main-menu'>
          {isUser
          ? <BarLogged user={user} removeUser={ removeUser } />
          : <Bar loading={isLoading} err={userErr} search={searchUser} /> }
        </div>
        <Segment disabled={false} className='container body'>
          {false && <Halogen.ScaleLoader id='body-loader' size="36px" color='#26A65B' />}
          <Grid padded centered>
            <Grid.Row centered>
              <Grid.Column width={12}>
                  <LBody />
              </Grid.Column>
              <Divider vertical></Divider>
              <Grid.Column width={4}>
                <div className='history'>
                  {isNowPlaying && <NowPlaying track={track} />}
                  <RecentTracks isNowPlaying={isNowPlaying} tracks={recentTracks} isFetching={isFetching} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps({ user, tracks, nowPlaying}){
  const { recentTracks, isFetching }  = tracks
  const { isNowPlaying, track } = nowPlaying

  return { user, recentTracks, isFetching, isNowPlaying, track }
}

function mapDispatchToProps(dispatch){
  return {
    searchUser: (e, m) => dispatch(searchForUser(e, m)),
    removeUser: ()     => dispatch(removeUser()),
    nowPlaying: (e)    => dispatch(nowPlaying(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)