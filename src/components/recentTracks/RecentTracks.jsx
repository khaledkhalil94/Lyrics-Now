import React, { Component} from 'react'
import {connect} from 'react-redux'
import { switchLyrics, nextPage, prevPage, hideMenu } from '../../actions'
import Item from './Item'
import { removeActiveItems } from '../../constants'
import Sv from './SmallView'
import Nv from './NormalView'

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

    if(this.props.sv) this.props.hideMenu(true)
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
    const { sv } = this.props
    const { recentTracks } = this.state
    const items = recentTracks.length > 1 ? recentTracks.map(this.mapItems) : []

    return sv ? <Sv items={items} pageChange={this.pageChange} />
              : <Nv items={items} pageChange={this.pageChange} />
  }
}

function mapStateToProps({ tracks, nowPlaying, lyricsDisplay }){
  const [{ recentTracks }, { isNowPlaying, track }]  = [tracks, nowPlaying]

  return { recentTracks, isNowPlaying, track,
    lyricTrack: lyricsDisplay.track
   }
}

function mapDispatchToProps(dispatch){
  return {
    switchLyrics: (e) => dispatch(switchLyrics(e)),
    hideMenu:     (e) => dispatch(hideMenu(e)),
    nextPage: () => dispatch(nextPage()),
    prevPage: () => dispatch(prevPage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentTracks)