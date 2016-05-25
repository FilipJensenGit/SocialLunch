import React, { Component } from 'react'
import actions from '../redux/actions'

class Match extends Component {
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
                if(this.props.match.teamA != null && this.props.match.teamA.length > 0) return <div>{this.props.match.teamA[0].name} ({this.props.match.teamA[0].points})</div>
                else return <div>?</div>
                }
              )()}
              {(() => {
                if(this.props.match.teamA != null && this.props.match.teamA.length > 1) return <div>{this.props.match.teamA[1].name} ({this.props.match.teamA[1].points})</div>
                else return <div>?</div>
                }
              )()}
          </div>
          <div style={Object.assign({}, styles.matchColumn, styles.matchVs)}>VS</div>
          <div style={styles.matchColumn}>
            {(() => {
                if(this.props.match.teamB != null && this.props.match.teamB.length > 0) return <div>{this.props.match.teamB[0].name} ({this.props.match.teamB[0].points})</div>
                else return <div>?</div>
                }
              )()}
              {(() => {
                if(this.props.match.teamB != null && this.props.match.teamB.length > 1) return <div>{this.props.match.teamB[1].name}  ({this.props.match.teamB[1].points})</div>
                else return <div>?</div>
                }
              )()}
          </div>
        </div>
      </div>
    )
  }
}
export default Match
