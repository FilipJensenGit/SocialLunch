import React, { Component } from 'react'
import LunchGroup from './LunchGroup'

class MatchList extends Component {

  render() {
    var styles = {
      matchContainer: {
        display: 'flex',
        flexDirection: 'column'
      }
    };

    return (
      <div style={styles.matchContainer}>
        {
            this.props.matches.map((match) => {
              return <LunchGroup key={match._id} match={match}/>
            })
        }
      </div>
    )
  }
}

export default MatchList
