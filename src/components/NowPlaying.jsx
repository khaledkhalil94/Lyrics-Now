import React, { Component, PropTypes } from 'react'
import { Header, Segment, List, Image } from 'semantic-ui-react'
import Halogen from 'halogen'
import {DEF_TRACK_PIC} from '../constants'

class NowPlaying extends Component {
  render () {
    const { track } = this.props
    return (
      <div className='now-playing'>
        <Header as='h5' attached='top'>
          Now Playing
          <Halogen.BeatLoader className='halogen-loader' size="6px" color='rgb(84, 135, 208)' />
        </Header>
        <Segment className='np-item' attached>
          <List divided relaxed verticalAlign='middle' size='large'>
            <List.Item as='a'>
              <Image width={34} height={34} src={track.image[0]['#text'] || DEF_TRACK_PIC} />
              <List.Content className='list item'>
                <List><p>{track.artist['#text']} - {track.name}</p></List>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </div>
    )
  }
}

NowPlaying.propTypes = {
  track: PropTypes.object.isRequired
}

export default NowPlaying;