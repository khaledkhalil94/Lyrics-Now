import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import Content from './content'
import Contact from './contact'
import Trigger from './utils/trigger'

const initialState = { modalOpen: false, c: false }


class Feedback extends Component {
  constructor(){
    super()
    this.handleClose = this.handleClose.bind(this)
    this.handleUnMount = this.handleUnMount.bind(this)
    this.switchModal = this.switchModal.bind(this)

    this.state = initialState
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleMount() {
    localStorage.setItem('about_visited', 'true')
  }

  switchModal(v) {
    this.setState({ c: v })
  }

  handleClose(e) {
    e.preventDefault()
    this.setState({ modalOpen: false })
  }

  handleUnMount(){
    this.setState(initialState)
  }

  render(){
    const { modalOpen, c } = this.state
    return (
      <Modal
        size='small'
        open={modalOpen}
        onUnmount={this.handleUnMount}
        onClose={this.handleClose}
        trigger={<Trigger open={this.handleOpen} />}
        onMount={this.handleMount}
        >
        <Modal.Content>
          { c ? <Contact switchModal={this.switchModal} /> : <Content switchModal={this.switchModal} /> }
      </Modal.Content>
    </Modal>
    )
  }
}

export default Feedback