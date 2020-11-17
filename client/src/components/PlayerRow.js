import React from 'react'
import PropTypes from 'prop-types'

import { HEADERS }from '../const/const'

/* Material UI */
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class PlayerRow extends React.Component{
    render(){
        return(
            <TableRow key={this.props.player['_id']}>
                {HEADERS.map(h => {
                    return <TableCell key={this.props.player['_id']+h} align='center'>{this.props.player[h]}</TableCell>
                })}
            </TableRow>
        )
    }
}

PlayerRow.propTypes = {
    player: PropTypes.object
}

export default PlayerRow