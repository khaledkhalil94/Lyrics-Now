import React from 'react'
import { Divider } from 'semantic-ui-react'
import handleClick from './utils/_hndld'
import Footer from './footer'

export default ({switchModal}) =>
(
  <div className="about">
    <div id='about_img'></div>
    <h3>Lyrics Now</h3>
    <div className='content'>
      <p className='first'>Lyrics Now is a free and <a href='https://github.com/khaledkhalil94/Lyrics-Now'>Open Source</a> lyrics 
        displaying app developed for the <a href='https://last.fm'>Last.fm</a> community and powered by free public sources.</p>
      <p className='second'>This app is a personal and independent work, and not affiliated with last.fm or any other organization.</p>
    </div>
    <Divider />
    <div className='donation'>
      <p>If you want to support me and help keep the server running , please consider making a donation.<br />
      Donations are accepted through paypal.me <a href='https://www.paypal.me/'><i>What is paypal.me</i></a></p>
      <div id='paypal_icon' onClick={handleClick}></div>
    </div>
    <Divider />
    <Footer switchModal={switchModal} />
  </div>
)