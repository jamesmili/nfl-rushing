import React from 'react'
import { connect } from 'react-redux'
import { ordering } from '../actions/action'
import PropTypes from 'prop-types'

import { HEADERS, ORDER }from '../const/const'
import PlayerRow from './PlayerRow'

/* Material UI */
import { Table as MatTable }from '@material-ui/core/';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper'

class Table extends React.Component{
    constructor(props){
        super(props)
        this.state={
            orderBy: 'Player',
            ascDesc: 'asc',
        }
        this.handleRequestSort = this.handleRequestSort.bind(this)
    }

    handleRequestSort = (property) => {
        const isAsc = this.state.orderBy === property && this.state.ascDesc === 'asc'
        isAsc ? this.setState({ ascDesc: 'desc'}, () => {
            this.props.ordering('-' + property)
            property = '-' + property
        })  
        : 
        this.setState({ ascDesc: 'asc'}, () => {
            this.props.ordering(property)
        })
        this.setState({ orderBy: property}, () => {
            this.props.updateData(property)
        })
    };
    
    render(){
        return(
            <TableContainer id="table" component={Paper}>
                <MatTable stickyHeader size="small">
                    <TableHead>
                        {HEADERS.map(h => {
                            return ORDER.includes(h) ? 
                            <TableCell
                                align="center"
                                variant="head"
                                key={h}
                                padding='none'
                                onClick={(e) => this.handleRequestSort(e.target.textContent)}
                                sortDirection={this.state.orderBy === h ? this.state.ascDesc : false}>
                                <TableSortLabel
                                    active={this.state.orderBy === h}
                                    direction={this.state.orderBy === h ? this.state.ascDesc : 'asc'}>
                                    <p>{h}</p>
                                </TableSortLabel>
                            </TableCell>
                            : 
                            <TableCell key={h} 
                                component="div"
                                variant="head" 
                                padding='none' 
                                align='center'>
                                {h}
                            </TableCell>
                            })}
                    </TableHead>
                    <TableBody>
                            {this.props.players.data.map(p => {
                                return <PlayerRow key={p['_id']} player={p}/>
                            })}
                    </TableBody>
                </MatTable>
            </TableContainer>
        )
    }
}

Table.propTypes = {
    orderBy: PropTypes.string,
    ordering: PropTypes.func,
    players: PropTypes.object
}

const mapStateToProps = (state, props) => {
    return {
        orderBy: state.data.ordering,
    }
}

const mapDispatchToProps = dispatch => ({
    ordering: (o) => dispatch(ordering(o)),
})

export default connect(mapStateToProps, mapDispatchToProps) (Table)