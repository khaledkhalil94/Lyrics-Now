import React, { Component, PropTypes } from 'react'
import { Header, Segment, List, Image, Icon } from 'semantic-ui-react'
import Halogen from 'halogen'
import {DEF_TRACK_PIC} from '../../constants'

class NowPlaying extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
  }

  handleClick(){
    const { track, switchLyrics } = this.props
    switchLyrics(track)
  }

  hideMenu(){
    const { hideMenu } = this.props
    hideMenu()
  }

  render () {
    const { track } = this.props
    return (
      <div className='now-playing'>
        <Header as='h5' attached='top'>
          <p>Now Playing</p>
          <Halogen.BeatLoader className='halogen-loader' size="6px" color='rgb(84, 135, 208)' />
          <Icon id='now-playing-hide-btn' circular link name='hide' title='Hide Recent Tracks' onClick={this.hideMenu} />
        </Header>
        <Segment className='np-item' attached>
          <List divided relaxed verticalAlign='middle' size='large' onClick={this.handleClick}>
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
  track: PropTypes.object.isRequired,
  switchLyrics: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired
}

export default NowPlaying