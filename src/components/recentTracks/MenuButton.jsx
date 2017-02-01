import React, { PropTypes } from 'react'
import { Button, Icon } from 'semantic-ui-react'

const Buttons = ({prevDis, nxtDis, pageChange}) => {
  return (
    <Button.Group attached='bottom'>
      <Button disabled={prevDis} icon onClick={() => pageChange(false)}><Icon name='left arrow' /></Button>
      <Button disabled={nxtDis} icon onClick={() => pageChange(true)}><Icon name='right arrow' /></Button>
    </Button.Group>
  )
}

Buttons.propTypes = {
  prevDis: PropTypes.bool.isRequired,
  nxtDis: PropTypes.bool.isRequired,
  pageChange: PropTypes.func.isRequired
}

export default Buttons