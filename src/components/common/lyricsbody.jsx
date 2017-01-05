import React, {Component} from 'react'
import Lyrics from './lyricsContent'
import Info from './Info'

class LyricsBody extends Component {
  render () {
    return (
      <div className='lyrics-body'>
        <Info songTitle={'title'} songArtist={'Artist'} />
        <div className='lyrics'>
          <Lyrics />
        </div>
      </div>
    )
  }
}

export default LyricsBody