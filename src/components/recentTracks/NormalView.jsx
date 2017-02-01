import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { List, Segment, Header } from 'semantic-ui-react'
import Buttons from './MenuButton'
import NowPlaying from './NowPlaying'
import Halogen from 'halogen'
import { switchLyrics } from '../../actions'

class NV extends Component {
  render(){
    const {isFetching, user, page, items, pageChange, isNowPlaying, switchLyrics, track} = this.props
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
          <Buttons prevDis={page <= 1} nxtDis={!user.user} pageChange={pageChange} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ user, tracks, nowPlaying }){
  const [{ isFetching }, { isNowPlaying, track, page }]  = [tracks, nowPlaying]

  return { user, isFetching, isNowPlaying, track, page }
}

function mapDispatchToProps(dispatch) {
  return { switchLyrics: (e) => dispatch(switchLyrics(e)) }
}

NV.propTypes = {
  user: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  track: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  isNowPlaying: PropTypes.bool.isRequired,
  pageChange: PropTypes.func.isRequired,
  switchLyrics: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NV)