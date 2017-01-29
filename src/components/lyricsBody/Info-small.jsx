import React, { PropTypes } from 'react'

const Info = ({ img, artist, title }) =>
(
  <div className='song-info-small'>
    <img src={img} width='80px' alt='' />
    <div className='song-details'>
      <p className='songArtist'>{artist}</p>
      <p className='songTitle'>{title}</p>
    </div>
  </div>
)

Info.propTypes = {
  img: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Info