import React, { Component } from 'react'
import {connect} from 'react-redux'
import { searchForUser } from './../actions'
import { Segment, Input, Header, Divider, Icon, Message } from 'semantic-ui-react'
import '../css/frontpage.css'

class FrontPage extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onKey = this.onKey.bind(this)
    this.state = { value: '' }
  }

  handleChange(e, {value}){
    this.setState({value: value})
  }

  onKey(e){
    if(e.keyCode === 13) this.handleClick()
  }

  handleClick(){
    const { searchUser } = this.props
    if(this.state.value.substr(0, 4) === '/dev'){
      localStorage.setItem('enable_devtools', 'true')
      window.location.replace('/')
    }
    else searchUser(this.state.value)
  }

  render () {
    const { isLoading, userErr } = this.props.user
    const actions = { type: 'submit', content: 'Go!', onClick: this.handleClick }

    return (
      <div className='main-page not-logged'>
        <Segment padded='very' loading={isLoading}>
          <Header
            as='h2'
            image='/favicon.ico'
            content='Lyrics Now'
            />
          <Divider section />
          <p className='app-desc'>Login with your Last.fm username<br/>
          to see the lyrics for tracks you're scrobbling right now!</p>
          <Input
            error={userErr}
            icon='lastfm'
            iconPosition='left'
            placeholder='Enter your lastfm username'
            onChange={this.handleChange}
            action={actions}
            onKeyDown={this.onKey}
          />
          {userErr && <Message negative>
            <p>Username is incorrect.</p>
          </Message>}
          <Divider />
          <div className='footer'>
            <div>Powered by: <a href='https://last.fm'><Icon name='lastfm' link bordered inverted color='red' /></a></div>
            <div>
              <a href='https://github.com/khaledkhalil94/Lyrics-Now'><Icon name='github' color='black' link size='large' /></a>
              <a href='https://twitter.com/khaledkhalil94'><Icon name='twitter' color='blue' link size='large' /></a>
              <a href='http://khaledkhalil.me'><Icon name='world' color='black' link size='large' /></a>
            </div>
          </div>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps({user}){
  return { user }
}

function mapDispatchToProps(dispatch){
  return {
    searchUser: (e) => dispatch(searchForUser(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)