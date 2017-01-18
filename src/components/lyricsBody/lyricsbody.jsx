import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import Lyrics from './lyricsContent'
import Info from './Info'
import {DEF_TRACK_PIC} from '../../constants'
import Halogen from 'halogen'

class LyricsBody extends Component {
  componentDidUpdate() {
    const element = document.querySelector('.lyrics-body .lyrics')
    const overlayElm = document.querySelector('.lyrics-overlay')
    if(element.offsetHeight == element.scrollHeight) overlayElm.style.display = 'none'
    else {
      overlayElm.style.display = 'block'
      element.onscroll = () => {
        if(50 + element.offsetHeight + element.scrollTop >= element.scrollHeight) {
          let height = (element.scrollHeight - element.scrollTop - element.offsetHeight) * 2
          overlayElm.style.height = `${height}px`
        } else {
          overlayElm.style.height = '100px'
        }
      }
    }
  }

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
          <div className='lyrics-overlay'></div>
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

LyricsBody.propTypes = {
  track: PropTypes.object.isRequired,
  lyrics: PropTypes.string,
  isFetching: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(LyricsBody)