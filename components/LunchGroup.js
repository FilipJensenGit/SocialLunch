import React, { Component } from 'react'
import actions from '../redux/actions'

class LunchGroup extends Component {
  render() {
    var styles = {
      matchContents: {
        display: 'flex',
        flexDirection: 'row'
      },
      matchColumn: {
        flexGrow: '1',
        display: 'inline-block',
        marginRight: '10px',
        verticalAlign: 'middle',
        width: '30%'
      },
      match: {
        margin: '10px 10px',
        padding: '10px',
        width: '50%',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '1px',
        borderColor: '#D6D3D5',
        backgroundColor: '#E7E4E6',
        boxShadow: '3px 3px 5px #888888'
      },
      matchTable: {
        fontWeight: 'bold',
        marginBotton: '10px'
      },
      matchVs: {
        paddingTop: '10px'
      }
    }
    return (
      <div style={styles.match}>
        <div style={styles.matchTable}>{this.props.match.table}</div>
        <div style={styles.matchContents}>
          <div style={styles.matchColumn}>
            {(() => {
				var participantsList = [];
                for(var i=0; i<this.props.match.participants.length; i++){
					participantsList.push(<div>{this.props.match.participants[i].name}</div>);
				}
				return <div>{participantsList}</div>;
              }
              )()}
          </div>
        </div>
      </div>
    )
  }
}
export default LunchGroup
