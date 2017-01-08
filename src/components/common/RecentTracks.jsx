import React, { Component} from 'react'
import {connect} from 'react-redux'
import { Header, Segment, List, Image } from 'semantic-ui-react'
import {DEF_TRACK_PIC} from '../../constants'
import Halogen from 'halogen'
import NowPlaying from '../NowPlaying'

class RecentTracks extends Component {
  constructor(){
    super()
    this.state = { recentTracks: [], nowPlaying: {} }
    this.mapItems = this.mapItems.bind(this)
  }

  componentWillReceiveProps({recentTracks, isNowPlaying, track}) {
    const newTracks = recentTracks.slice()
    if(isNowPlaying) newTracks.shift()
    this.setState({ recentTracks: newTracks })
    if(track !== this.state.nowPlaying) this.setState({ nowPlaying: track})
  }

  mapItems(e, i){
    return(
      <List.Item as='a' key={i}>
        <Image width={34} height={34} src={e.image[0]['#text'] || DEF_TRACK_PIC} />
        <List.Content className='list item'>
          <List><p>{e.artist['#text']} - {e.name}</p></List>
        </List.Content>
      </List.Item>
    )
  }

  render () {
    const { isFetching, isNowPlaying } = this.props
    const { recentTracks } = this.state
    const items = recentTracks.length > 1 ? recentTracks.map(this.mapItems) : ''
    const attached = isNowPlaying ? true : 'top'

    return (
      <div>
        {isNowPlaying && <NowPlaying track={this.state.nowPlaying} />}
        <div className='recent-tracks'>
          <Header as='h5' attached={attached}>
            RECENT TRACKS
          </Header>
          <Segment attached>
            {isFetching && <Halogen.ScaleLoader className='halogen-loader' size="36px" color='#26A65B' />}
            <List divided relaxed verticalAlign='middle' size='large'>
              {items}
            </List>
          </Segment>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ tracks, nowPlaying}){
  const [{ recentTracks, isFetching }, { isNowPlaying, track }]  = [tracks, nowPlaying]

  return { recentTracks, isFetching, isNowPlaying, track }
}

export default connect(mapStateToProps)(RecentTracks)