import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Message, Form, Divider, Icon } from 'semantic-ui-react'
import { sendFeedback } from '../../actions'

class Contact extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = { msgSent: false, formError: false, errMsg: null }
  }

  handleSubmit(e, { formData }){
    const { sendFeedback } = this.props
    e.preventDefault()
    if(formData.msg.length < 1) {
      this.setState({ formError: true, errMsg: 'Message can\'t be empty' })
      return false
    }
    sendFeedback(e.target)
    .then(res => res.json())
    .then(res => (res === 'success') ? this.setState({ msgSent: true }) : this.setState({ formError: true, errMsg: res }))
  }

  render () {
    const { msgSent, formError, errMsg } = this.state
    const { switchModal } = this.props

    return (
      <div className='contact page'>
        <div className='message-form'>
          {msgSent ? <Message positive>
            <Message.Header>Your message has been sent, thank you!</Message.Header>
          </Message>
          : <div className='contact-message'>
              <h4>If you have any issues or suggestions, I would be happy to hear them.</h4>
              <Form autoFocus error={formError} onSubmit={this.handleSubmit}>
                <Form.TextArea name='msg' rows='3' />
                <Message error content={errMsg} />
                <Button style={{ background: '#257b40', color: 'white' }} type='submit'> Send </Button>
                <Button basic onClick={() => switchModal(false)}> Go Back </Button>
              </Form>
            </div>
          }
        </div>
        <Divider section />
        <div className='follow-links'>
          <p>You can also follow me on:</p>
          <a href='https://twitter.com/khaledkhalil94'><Icon color='blue' size='large' title='Twitter' name='twitter' /></a>
          <a href='https://github.com/khaledkhalil94'><Icon color='black'size='large' title='Github' name='github' /></a>
          <a href='https://www.last.fm/user/khaledkhalil94'><Icon color='red' size='large' title='Lastfm' name='lastfm square' /></a>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    sendFeedback: e => dispatch(sendFeedback(e))
  }
}

export default connect(null, mapDispatchToProps)(Contact)