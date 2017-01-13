import React, { PropTypes } from 'react'
import { Icon } from 'semantic-ui-react'

const Info = ({ img, artist, title, link }) =>
(
  <div className='song-info'>
    <img src={img} width='240px' alt='' />
    <div className='song-details'>
      <p className='songArtist'>{artist}</p><a title={`${artist}'s page on lastfm`} className='artist-lastfm-page' href={link}><Icon link color='red' name='lastfm' /></a>
      <p className='songTitle'>{title}</p>
    </div>
  </div>
)

Info.propTypes = {
  img: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired

}

export default Info