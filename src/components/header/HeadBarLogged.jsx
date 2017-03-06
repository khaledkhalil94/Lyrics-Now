import React, { PropTypes } from 'react'
import { Menu } from 'semantic-ui-react'
import { DEF_IMG } from '../../constants'
import About from '../about/'

const Bar = ({user, removeUser, refresh, isHidden, showMenu, hideMenu, isResHidden}) =>
(
  <Menu borderless inverted className='container'>
    <Menu.Item as='a' href={user.url}>
      <img src={user.image[2]['#text'] ? user.image[2]['#text'] : DEF_IMG} alt='' />
    </Menu.Item>
    <Menu.Item style={{padding: '10px'}} header as='a' href={user.url} name={user.realname ? user.realname : user.name} />

    <Menu.Menu position='right'>
      <About />
      {isHidden && <Menu.Item className='hide-btn' as='a' icon='unhide' title='Show recent tracks' onClick={() => showMenu()} />}
      {!isHidden && <Menu.Item className='hide-btn' as='a' icon='hide' title='Hide recent tracks' onClick={() => hideMenu()} />}
      {isResHidden && <Menu.Item className='content-btn' as='a' icon='content' title='Show recent tracks' onClick={() => showMenu(true)} />}
      {!isResHidden && <Menu.Item className='content-btn active' as='a' icon='content' title='Hide recent tracks' onClick={() => hideMenu(true)} />}
      <Menu.Item className='refresh-btn' as='a' icon='refresh' title='Refresh' onClick={()=> refresh(user.name)} />
      <Menu.Item className='logout-btn' as='a' icon='log out' title='Logout' onClick={()=> removeUser()} />
    </Menu.Menu>
  </Menu>
)

Bar.propTypes = {
  user: PropTypes.object.isRequired,
  removeUser: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isResHidden: PropTypes.bool.isRequired
}

export default Bar