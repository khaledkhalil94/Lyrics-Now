import React, { PropTypes } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { DEF_IMG } from '../../constants'

const Bar = ({user, removeUser, refresh, isHidden, showMenu, hideMenu}) =>
(
  <Menu borderless inverted className='container'>
    <Menu.Item as='a' href={user.url}>
      <img src={user.image[2]['#text'] ? user.image[2]['#text'] : DEF_IMG} alt='' />
    </Menu.Item>
    <Menu.Item header as='a' href={user.url} name={user.realname ? user.realname : user.name} />
    {false && <Menu.Item id='spinner' icon={<Icon name='spinner loading' size='large' />} />}

    <Menu.Menu className='asd' position='right'>
      {isHidden && <Menu.Item className='logout-btn' as='a' icon='unhide' title='Show recent tracks' onClick={() => showMenu()} />}
      {!isHidden && <Menu.Item className='logout-btn' as='a' icon='hide' title='Hide recent tracks' onClick={() => hideMenu()} />}
      <Menu.Item className='logout-btn' as='a' icon='refresh' title='Refresh' onClick={()=> refresh(user.name)} />
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
  isHidden: PropTypes.bool.isRequired
}

export default Bar