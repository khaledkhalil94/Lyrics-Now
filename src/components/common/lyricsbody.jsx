import React, {Component} from 'react'
import {connect} from 'react-redux'
import Lyrics from './lyricsContent'
import Info from './Info'
import {DEF_TRACK_PIC} from '../../constants'

class LyricsBody extends Component {
  render () {
    const { track, lyrics } = this.props
    const img = track.image[2]['#text'] || DEF_TRACK_PIC
    const { name } = track
    const artist = track.artist['#text']

    return (
      <div className='lyrics-body'>
        <Info img={img} title={name} artist={artist} />
        <div className='lyrics'>
          <Lyrics lyrics={lyrics} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ nowPlaying }){
  const { track, lyrics } = nowPlaying

  return { track, lyrics }
}

export default connect(mapStateToProps)(LyricsBody)