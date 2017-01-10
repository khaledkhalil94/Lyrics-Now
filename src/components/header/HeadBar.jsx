import React, { Component, PropTypes } from 'react'
import { Menu, Input, Icon } from 'semantic-ui-react'

class Bar extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {value: ''}
  }

  handleChange(e, {value}){
    this.setState({value: value})
  }

  handleClick(){
    const { search } = this.props
    search(this.state.value, true)
  }

  render(){
    const { loading, err } = this.props
    const iconLoading = loading ? <Icon loading name='spinner' /> : null
    const actions = { type: 'submit', color: 'teal', icon: 'arrow right', onClick: this.handleClick }
    return (
      <Menu stackable borderless inverted className='grey container'>
        <Menu.Item>
          <Input onChange={this.handleChange} error={err} icon={iconLoading} action={actions} className='icon' placeholder='Enter your username' />
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