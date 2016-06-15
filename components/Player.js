import React, { Component } from 'react'
import actions from '../redux/actions'

class Player extends Component {

  handleDelete(event) {
    event.preventDefault();
    this.props.dispatch(actions.deletePlayer(this.props.player))
  }

  render() {
    var styles = {
      order: {
        marginRight: '10px',
        width: '40px',
        display: 'inline-block'
      },
      name: {
        marginRight: '10px',
        width: '200px',
        display: 'inline-block'
      },
      playerLine: {
        margin: '10px 10px',
        padding: '10px',
        width: '40%',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '1px',
        borderColor: '#D6D3D5',
        backgroundColor: '#E7E4E6',
        boxShadow: '3px 3px 5px #888888'
      },
      buttonStyle: {
        backgroundColor: '#FF8F00',
        float: 'right',
        borderRadius: '8px',
        color: 'white',
        borderColor: '#FFCA28'
      }
    }

    return (
      <div style={styles.playerLine}>
        <div style={styles.order}>{this.props.orderNumber}</div>
        <div style={styles.name}>{this.props.player.name}</div>
        <button style={styles.buttonStyle} onClick={this.handleDelete.bind(this)}>Cancel</button>
      </div>
    )
  }
}
export default Player