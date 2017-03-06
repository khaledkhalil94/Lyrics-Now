import React, { Component, PropTypes } from 'react'
import { Menu, Input, Icon } from 'semantic-ui-react'

class Bar extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onKey = this.onKey.bind(this)
    this.state = {value: ''}
  }

  handleChange(e, {value}){
    this.setState({value: value})
  }

  onKey(e){
    if(e.keyCode === 13) this.handleClick()
  }

  handleClick(){
    const { search } = this.props
    if(this.state.value.substr(0, 4) === '/dev'){
      localStorage.setItem('enable_devtools', 'true')
      window.location.replace('/')
    }
    else search(this.state.value)
  }

  render(){
    const { loading, err } = this.props
    const iconLoading = loading ? <Icon loading name='spinner' /> : null
    const actions = { type: 'submit', color: 'teal', icon: 'arrow right', onClick: this.handleClick }
    return (
      <Menu borderless inverted className='container'>
        <Menu.Item>
          <Input onChange={this.handleChange} error={err} icon={iconLoading} action={actions} onKeyDown={this.onKey} className='icon' placeholder='Enter your lastfm username' />
        </Menu.Item>
      </Menu>
    )
  }
}

Bar.propTypes = {
  search: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  err: PropTypes.bool
}

export default Bar