import React, { Component, PropTypes } from 'react'
import { Item } from 'semantic-ui-react'
import { List, Image } from 'semantic-ui-react'
import { DEF_TRACK_PIC } from '../../constants'

class item extends Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps.e.name !== this.props.e.name) || document.querySelectorAll('.recent-tracks a.active.item').length === 0
  }

  render() {
    const { e, click, num, track } = this.props
    const active = () => {
      const nodes = document.querySelectorAll('.recent-tracks a.active.item')
      return (track.name === e.name && nodes.length === 0) ? 'active' : ''
    }
    return (
      <Item as='a' className={active()} ref={(i) => this.item = i} onClick={(item) => click(num, item)}>
        <Image width={34} height={34} src={e.image[0]['#text'] || e.artist.image[0]['#text'] || DEF_TRACK_PIC} />
        <List.Content className='list item'>
          <List><p><span id='artist'>{e.artist.name}</span> - <span>{e.name}</span></p></List>
        </List.Content>
      </Item>
    )
  }
}

item.propTypes = {
  e: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired,
  num: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired
}

export default item