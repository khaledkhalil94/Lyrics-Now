import React, { PropTypes } from 'react'

const Info = (props) =>
(
  <div className='song-info'>
    <img src='https://s.mxmcdn.net/images-storage/albums/0/0/2/8/1/0/35018200_350_350.jpg' width='240px' alt='' />
    <div className='song-details'>
      <span className='songArtist'>{props.songTitle}</span> - <span className='songTitle'>{props.songArtist}</span>
    </div>
  </div>
)

Info.propTypes = {
  songArtist: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired

}

export default Info