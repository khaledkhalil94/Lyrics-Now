import React, { PropTypes } from 'react'

const Info = ({ img, artist, title }) =>
(
  <div className='song-info'>
    <img src={img} width='240px' alt='' />
    <div className='song-details'>
      <span className='songArtist'>{artist}</span> - <span className='songTitle'>{title}</span>
    </div>
  </div>
)

Info.propTypes = {
  img: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired

}

export default Info