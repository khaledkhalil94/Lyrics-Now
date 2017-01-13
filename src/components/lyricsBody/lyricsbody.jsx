import React, {Component} from 'react'
import {connect} from 'react-redux'
import Lyrics from './lyricsContent'
import Info from './Info'
import {DEF_TRACK_PIC} from '../../constants'
import Halogen from 'halogen'

class LyricsBody extends Component {
  render () {
    const { track, lyrics, isFetching } = this.props
    const img = track.image[2]['#text'] || track.artist.image[2]['#text'] || DEF_TRACK_PIC
    const { name } = track
    const artist = track.artist.name
    const link = track.artist.url

    return (
      <div className='lyrics-body'>
        <Info img={img} title={name} artist={artist} link={link} />
        <div className='lyrics'>
          {isFetching && <Halogen.ScaleLoader className='halogen-loader' size="36px" color='#c7c7c7' />}
          <Lyrics lyrics={lyrics} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ lyricsDisplay }){
  const { track, lyrics, isFetching } = lyricsDisplay

  return { track, lyrics, isFetching }
}

export default connect(mapStateToProps)(LyricsBody)