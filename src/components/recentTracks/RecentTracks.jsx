import React, { Component} from 'react'
import {connect} from 'react-redux'
import { switchLyrics, nextPage, prevPage } from '../../actions'
import { Header, Segment, List, Button, Icon } from 'semantic-ui-react'
import Halogen from 'halogen'
import NowPlaying from './NowPlaying'
import Item from './Item'
import { removeActiveItems } from '../../constants'

class RecentTracks extends Component {
  constructor(){
    super()
    this.state = { recentTracks: [] }
    this.mapItems = this.mapItems.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.pageChange = this.pageChange.bind(this)
  }

  componentWillMount() {
    const { recentTracks, isNowPlaying } = this.props
    const newTracks = recentTracks.slice()
    if(isNowPlaying) newTracks.shift()
    this.setState({ recentTracks: newTracks })
  }

  componentWillReceiveProps({recentTracks, isNowPlaying}) {
    const newTracks = recentTracks.slice()
    if(isNowPlaying) newTracks.shift()
    this.setState({ recentTracks: newTracks })
  }

  handleClick(num, item){
    removeActiveItems()
    item.target.closest('.recent-tracks a.item').className = 'item active'
    const { switchLyrics } = this.props
    const clickedTrack = this.state.recentTracks[num]
    switchLyrics(clickedTrack)
  }

  pageChange(next){
    const { nextPage, prevPage } = this.props
    next ? nextPage() : prevPage()
    removeActiveItems()
  }


  mapItems(e, i){
    const { lyricTrack } = this.props
    return <Item track={lyricTrack} e={e} key={i} num={i} click={this.handleClick} />
  }

  render () {
    const { isFetching, isNowPlaying, switchLyrics, track, page, user } = this.props
    const { recentTracks } = this.state
    const items = recentTracks.length > 1 ? recentTracks.map(this.mapItems) : ''
    const attached = isNowPlaying ? true : 'top'
    return (
      <div className='history'>
        {isNowPlaying && <NowPlaying switchLyrics={switchLyrics} track={track} />}
        <div className='recent-tracks'>
          <Header as='h5' attached={attached}>
            RECENT TRACKS {page > 1 && <small>({page})</small>}
          </Header>
          <Segment className='tracks' attached>
            {isFetching && <Halogen.ScaleLoader className='halogen-loader' size="36px" color='#c7c7c7' />}
            <List divided relaxed verticalAlign='middle' size='large'>
              {items}
            </List>
          </Segment>
          <Button.Group attached='bottom'>
            <Button disabled={page <= 1} icon onClick={()=>this.pageChange(false)}><Icon name='left arrow' /></Button>
            <Button disabled={!user.user} icon onClick={()=>this.pageChange(true)}><Icon name='right arrow' /></Button>
          </Button.Group>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ user, tracks, nowPlaying, lyricsDisplay }){
  const [{ recentTracks, isFetching }, { isNowPlaying, track, page }]  = [tracks, nowPlaying]

  return { user, recentTracks, isFetching, isNowPlaying, track, page,
    lyricTrack: lyricsDisplay.track
   }
}

function mapDispatchToProps(dispatch){
  return {
    switchLyrics: (e) => dispatch(switchLyrics(e)),
    nextPage: () => dispatch(nextPage()),
    prevPage: () => dispatch(prevPage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentTracks)