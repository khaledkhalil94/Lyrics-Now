import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react'
import { sendFeedback } from './../actions'

const initialState = { modalOpen: false, msgSent: false, formError: false, errMsg: null }
class Feedback extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleUnMount = this.handleUnMount.bind(this)

    this.state = initialState
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose(e) {
    e.preventDefault()
    this.setState({ modalOpen: false })
  }

  handleSubmit(e, { formData }){
    const { sendFeedback } = this.props
    e.preventDefault()
    if(formData.msg.length < 1) {
      this.setState({ formError: true })
      this.setState({ errMsg: 'Message can\'t be empty' })
      return false
    }
    sendFeedback(e.target)
    this.setState({ msgSent: true })
    setTimeout(()=> this.setState(initialState), 3000)
  }

  handleUnMount(){
    this.setState(initialState)
  }

  render(){
    const { modalOpen, msgSent, formError, errMsg } = this.state
    return (
      <Modal
        open={modalOpen}
        onUnmount={this.handleUnMount}
        onClose={this.handleClose}
        trigger={<a onClick={this.handleOpen} className='footer-item right-item'> <Icon name='info circle' />Send feedback</a>}
        >
        <Modal.Content>
          {msgSent ? <Message positive>
            <Message.Header>Your message has been sent, thanks for your feedback.</Message.Header>
          </Message>
          : <Modal.Description>
            <h4>If you have any issues or suggestions, I'd be happy to hear them.</h4>
          <Form error={formError} onSubmit={this.handleSubmit}>
            <Form.TextArea error={formError} name='msg' placeholder='You may provide your email for a reply' rows='3' />
            <Message error content={errMsg} />
            <Button style={{ background: '#257b40', color: 'white' }} type='submit'> Send </Button>
            <Button onClick={this.handleClose}>Cancel</Button>
          </Form>
        </Modal.Description>}
      </Modal.Content>
    </Modal>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    sendFeedback: (e) => dispatch(sendFeedback(e))
  }
}

export default connect(null, mapDispatchToProps)(Feedback)