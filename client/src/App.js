import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { players } from './actions/action'
import PropTypes from 'prop-types'

import './styles/App.css';
import Table from './components/Table'
import TableActions from './components/TableActions'
import TableFooter from './components/TableFooter'
import GLOBALS from './config/common'

/* Material UI */
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends React.Component{
	constructor(props){
		super(props)
		this.state={
			loading: true,
			players: [],
		}
		this.updateData = this.updateData.bind(this)
	}

	componentDidMount(){
		this.updateData()
	}
	
	updateData(orderBy = this.props.orderBy, playerSearch = this.props.searchPlayer, pageNum = this.props.pageNum){
        const order = orderBy !== "" ? "&sort=" + orderBy : ""
        const search = playerSearch !== "" ? "&search=" + playerSearch : ""
		const page = pageNum !== "" ? "page=" + pageNum : ""
        axios.get(`${GLOBALS.API_ROOT}/api/players?` + page + search + order)
        .then(response => {
            this.setState({ 
                players: response.data,
				loading: false,
			}, () => {
				this.props.players(response.data)
			})
        }).catch(error => {
            console.log(error)
        })
	}
	
	render(){

		return (
			<div className="container">
				<h1 id="header">NFL Rushing</h1>
				<div className="content">
				{
					this.state.loading ? 
					<div className="loader"><CircularProgress color='inherit'/></div>
					:
					<div>
						<TableActions updateData={this.updateData}/>
						<Table updateData={this.updateData} players={this.state.players}/>
						<TableFooter updateData={this.updateData}/>
					</div>
				}
				</div>
			</div>
		)
	}
}

App.propTypes = {
	orderBy: PropTypes.string,
	searchPlayer: PropTypes.string,
	pageNum: PropTypes.number,
	players: PropTypes.func
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
	players: (p) => dispatch(players(p))
})

export default connect(mapStateToProps, mapDispatchToProps) (App);