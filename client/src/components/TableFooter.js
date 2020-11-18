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
            page: 1,
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
                <div className="button">
                    <Button onClick={() => this.handleClick(-1)} 
                        disabled={!this.props.nfl_players.prev_page || this.state.page < 1} 
                        variant="outlined" color="inherit"> 
                        Prev.
                    </Button>
                </div>
                <div className="button">
                    <Button onClick={() => this.handleClick(1)}
                        disabled={!this.props.nfl_players.next_page || this.props.nfl_players.data === []} 
                        variant="outlined" color="inherit"> 
                        Next
                    </Button>
                </div>
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