import React, { Component } from 'react'
import Match from './Match'

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
              return <Match key={match._id} match={match}/>
            })
        }
      </div>
    )
  }

}

export default MatchList
