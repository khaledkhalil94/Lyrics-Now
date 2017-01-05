import React, { PropTypes } from 'react'
import { Menu, Icon, Dropdown } from 'semantic-ui-react'
import Halogen from 'halogen'
import {DEF_IMG} from '../../../constants'

//<Menu.Item id='spinner'><Halogen.ScaleLoader color='rgb(145, 255, 241)' /></Menu.Item>
const Bar = ({user, removeUser}) => (
  <Menu stackable borderless inverted className='grey container'>
    <Menu.Item as='a' href={user.url}>
      <img src={user.image[2]['#text'] ? user.image[2]['#text'] : DEF_IMG} alt='' />
    </Menu.Item>
    <Menu.Item header as='a' href={user.url} name={user.realname ? user.realname : user.name} />
    {false && <Menu.Item id='spinner' icon={<Icon name='spinner loading' size='large' />} />}

    <Menu.Menu position='right'>
      <Menu.Item className='logout-btn' as='a' icon='log out' title='Logout' onClick={()=> removeUser()} />
    </Menu.Menu>
  </Menu>
)

Bar.propTypes = {
  user: PropTypes.object.isRequired,
  removeUser: PropTypes.func.isRequired
}

export default Bar