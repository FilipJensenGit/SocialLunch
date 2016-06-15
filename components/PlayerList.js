import React, { Component } from 'react'
import Player from './Player'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class PlayerList extends Component {

  render() {
    var styles = {
      playerList: {
        marginTop: '30px'
      }
    };

    var players = this.props.players.map(function(player,index) {
      return (
          <div key={player._id}>
            <Player key={player._id} player={player} dispatch={this.props.dispatch} orderNumber={index + 1}/>
          </div>
      );
    }.bind(this));
    return (
      <div style={styles.playerList}>
        <ReactCSSTransitionGroup transitionName="player" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {players}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default PlayerList