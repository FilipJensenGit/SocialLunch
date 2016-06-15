import React, { Component } from 'react'
import PlayerInput from './PlayerInput'
import PlayerList from './PlayerList'
import MatchList from './MatchList'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import css from "../css/social.css"

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.props.dispatch(actions.requestParticipants());
    this.props.socket.on('update', () => {
      this.props.dispatch(actions.requestParticipants());
    });
  }

  render() {
    var styles = {
      footerRefs: {
        position: 'absolute',
        bottom: '0px',
        fontSize: '10'
      }
    }
    var participantInput = (
      <div>
        <h2>Sign up for this week's lunch date!</h2>
        <p>Participants meet Friday at 12 PM in the cantine.</p>
        <PlayerInput dispatch={this.props.dispatch} spots={30 - this.props.players.length}/>
        <PlayerList players={this.props.players} dispatch={this.props.dispatch}/>
      </div>
    );

    var todaysMatches = (
      <div>
        <h2>This week's lunch dates!</h2>
        <p>Participants meet Friday at 12 PM in the cantine.</p>
        <MatchList matches={this.props.matches}/>
      </div>
    );
    return (
      <div>
        {this.props.matches.length > 0 ? todaysMatches : participantInput}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(App)