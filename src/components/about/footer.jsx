import React from 'react'
import { Icon } from 'semantic-ui-react'
import {fbShare, tweet } from './utils/_media'

export default ({switchModal}) => {
  return (
    <div className='footer'>
      <div className='share-btn'>
        <p>Share on:</p>
        <a onClick={fbShare} target="_blank">
          <Icon link style={{ color: '#1d3194' }} name='facebook' title='Share on Facebook' />
        </a>
        <a onClick={tweet} target="_blank" className="twitter-share-buttonff">
          <Icon link className='twitter-share-button' color='blue' name='twitter' title='Tweet' />
        </a>
      </div>
      <a className='footer-contact' onClick={() => switchModal(true)}><b>Contact Me</b></a>
    </div>
  )
}