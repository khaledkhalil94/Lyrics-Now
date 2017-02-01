import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { List } from 'semantic-ui-react'
import Buttons from './MenuButton'
import Halogen from 'halogen'

class SV extends Component {
  render(){
    const {isFetching, user, page, items, pageChange} = this.props

    return (
      <div className='recent-tracks small-view' id='recentTracks-SM'>
        <div className='tracks small-view'>
          {isFetching && <Halogen.ScaleLoader className='halogen-loader' size="36px" color='#c7c7c7' />}
          <List divided relaxed verticalAlign='middle' size='large'>
            {items}
          </List>
        </div>
        <Buttons prevDis={page <= 1} nxtDis={!user.user} pageChange={pageChange} />
      </div>
    )
  }
}

function mapStateToProps({ user, tracks, nowPlaying }){
  const [{ isFetching }, { page }]  = [tracks, nowPlaying]

  return { user, isFetching, page }
}

SV.propTypes = {
  user: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  pageChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(SV)