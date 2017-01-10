import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { List, Image } from 'semantic-ui-react'
import {DEF_TRACK_PIC} from '../../constants'

export default class item extends Component {
  render(){
    const { e, click, num } = this.props
    return (
      <Item as='a' ref={(i) => this.item = i} onClick={(item) => click(num, item)}>
        <Image width={34} height={34} src={e.image[0]['#text'] || DEF_TRACK_PIC} />
        <List.Content className='list item'>
          <List><p><span id='artist'>{e.artist['#text']}</span> - <span>{e.name}</span></p></List>
        </List.Content>
      </Item>
    )
  }
}