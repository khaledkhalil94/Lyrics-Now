import React from 'react'
import { Menu } from 'semantic-ui-react'

const Classname = () => {
  let className = 'info-btn'
  if(!localStorage.getItem('about_visited')) className += ' new'
  return className
}

export default ({open}) => <Menu.Item className={Classname()} as='a' icon='info' title='About' onClick={open} />