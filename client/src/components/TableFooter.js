import React from 'react'
import { connect } from 'react-redux'
import { page } from '../actions/action'
import PropTypes from 'prop-types'

/* Material UI */
import Button from '@material-ui/core/Button';

class TableFooter extends React.Component{
    constructor(props){
        super(props)
        this.state={
            page: 1
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(click){
        this.props.page(this.state.page + click)
        this.setState((prevState, props) => ({ page: prevState.page+click}), () => {
            this.props.updateData(this.props.orderBy, this.props.searchPlayer, this.state.page)
        })
    }
    render(){
        return(
            <div id="pageGroup">
                <Button onClick={() => this.handleClick(-1)} 
                    disabled={!this.props.nfl_players.prev} 
                    variant="outlined" color="primary"> 
                    Prev.
                </Button>
                <Button onClick={() => this.handleClick(1)}
                    disabled={!this.props.nfl_players.next} 
                    variant="outlined" color="primary"> 
                    Next
                </Button>
            </div>
        )
    }
}

TableFooter.propTypes = {
	orderBy: PropTypes.string,
	searchPlayer: PropTypes.string,
    pageNum: PropTypes.number,
    nfl_players: PropTypes.object,
    page: PropTypes.func
}

const mapStateToProps = (state, props) => {
    return {
        orderBy: state.data.ordering,
        searchPlayer: state.data.search,
		pageNum: state.data.page,
		nfl_players: state.data.players
    }
}

const mapDispatchToProps = dispatch => ({
	page: (p) => dispatch(page(p))
})
export default connect(mapStateToProps, mapDispatchToProps) (TableFooter);