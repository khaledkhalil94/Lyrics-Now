import React, { Component } from 'react'
import {connect} from 'react-redux'
import { removeUser, showMenu, hideMenu } from '../../actions'
import { Menu } from 'semantic-ui-react'
import { DEF_IMG } from '../../constants'
import About from '../about/'

class Header extends Component {
  render () {
    const {user, isHidden, isResHidden, removeUser, hideMenu, showMenu} = this.props

    return (
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
          <Menu.Item className='logout-btn' as='a' icon='log out' title='Logout' onClick={()=> removeUser()} />
        </Menu.Menu>
      </Menu>
    )
  }
}

function mapStateToProps({ tracks, user, nowPlaying}){
  const [{ isHidden }, { isResHidden }] = [nowPlaying, tracks]

  return { user: user.user, isHidden, isResHidden }
}

function mapDispatchToProps(dispatch){
  return {
    removeUser: ()     => dispatch(removeUser()),
    showMenu:   (e)     => dispatch(showMenu(e)),
    hideMenu:   (e)     => dispatch(hideMenu(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)