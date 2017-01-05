import React, { Component, PropTypes} from 'react'
import { Header, Segment, List, Image, Icon } from 'semantic-ui-react'
import {DEF_TRACK_PIC} from '../../constants'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Halogen from 'halogen'

class RecentTracks extends Component {
  static propTypes = {
    tracks: PropTypes.array,
    isFetching: PropTypes.bool
  }

  constructor(){
    super()
    this.state = { tracks: [] }
    this.mapItems = this.mapItems.bind(this)
  }

  componentWillReceiveProps({tracks, isNowPlaying}) {
    if(isNowPlaying) tracks.shift()
    this.setState({ tracks: tracks })
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
    const { tracks } = this.state
    const items = tracks.length > 1 ? tracks.map(this.mapItems) : ''
    const attached = isNowPlaying ? true : 'top'

    return (
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
    )
  }
}

export default RecentTracks;