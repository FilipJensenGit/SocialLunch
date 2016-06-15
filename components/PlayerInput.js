import React, { Component } from 'react'
import actions from '../redux/actions'

class PlayerInput extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      inputName: '',
      inputScore: ''
    }
  }

  handleNameChange(event) {
    this.setState({
      inputName: event.target.value,
      inputScore: this.state.inputScore
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch(actions.addPlayer(this.state.inputName, this.state.inputScore))
  }

  render() {

    var styles = {
      inputContainer: {
        display: 'flex',
        flexDirection: 'row'
      },
      inputSection: {
        margin: '5px 5px',
        position: 'relative'
      },
      submitButton: {
        width: '75px',
        lineHeight: '30px',
        backgroundColor: '#FF8F00',
        borderRadius: '8px',
        color: 'white',
        borderColor: '#FFCA28'
      },
      inputElement: {
        borderRadius: '10px',
        height: '20px',
        width: '200px',
        padding: '8px',
        borderColor: '#E0E0E0'
      }
    };

    var input = (
      <div style={styles.inputContainer}>
        <div style={styles.inputSection}>
          <input
            style={styles.inputElement}
            type="text"
            placeholder="Type in your name"
            value={this.state.inputName}
            onChange={this.handleNameChange.bind(this)}
          />
        </div>

        <div style={styles.inputSection}>
          <button style={styles.submitButton} onClick={this.handleSubmit.bind(this)}>Join</button>
        </div>
      </div>
    );
    var closedMsg = <div>No more participants for today!</div>
    return this.props.spots > 0 ? input : closedMsg;
  }
}

export default PlayerInput