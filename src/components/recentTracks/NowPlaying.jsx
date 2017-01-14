import React, { Component, PropTypes } from 'react'
import { Header, Segment, List, Image } from 'semantic-ui-react'
import Halogen from 'halogen'
import { DEF_TRACK_PIC, removeActiveItems } from '../../constants'

class NowPlaying extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    removeActiveItems()
    const { track, switchLyrics } = this.props
    switchLyrics(track)
  }

  componentWillMount() {
    removeActiveItems()
  }

  componentWillUpdate(nextProps) {
    if(nextProps.track.name !== this.props.track.name) removeActiveItems()
  }

  render () {
    const { track } = this.props
    return (
      <div className='now-playing'>
        <Header as='h5' attached='top'>
          <p>Now Playing</p>
          <Halogen.BeatLoader className='now-playing halogen-loader' size="6px" color='#74dffd' />
        </Header>
        <Segment className='np-item' attached>
          <List divided relaxed verticalAlign='middle' size='large' onClick={this.handleClick}>
            <List.Item as='a'>
              <Image width={34} height={34} src={track.image[0]['#text'] || track.artist.image[0]['#text'] || DEF_TRACK_PIC} />
              <List.Content className='list item'>
                <List><p>{track.artist.name} - {track.name}</p></List>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </div>
    )
  }
}

NowPlaying.propTypes = {
  track: PropTypes.object.isRequired,
  switchLyrics: PropTypes.func.isRequired
}

export default NowPlaying