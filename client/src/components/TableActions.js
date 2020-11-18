import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { search, page } from '../actions/action'
import PropTypes from 'prop-types'

/* Material UI */
import Button from '@material-ui/core/Button';

class TableAction extends React.Component{
    constructor(props){
        super(props)
        this.state={
            searchValue: ""
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.convertToCSV = this.convertToCSV.bind(this)
        this.download = this.download.bind(this)
    }

    handleSearch = (e) => {
        this.setState({ searchValue: e.target.value }, ()=>{
            this.props.search(e.target.value)
        })
        // reset page number to 1
        this.props.page(1)
        this.props.updateData(this.props.orderBy, e.target.value, 1)
    }

    convertToCSV(){
        const order = this.props.orderBy ? "sort=" + this.props.orderBy : ""
        const search = this.props.searchPlayer ? "&search=" + this.props.searchPlayer : ""
        axios.get('http://localhost:8000/api/download?' + order + search)
        .then(response => {
            this.download(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    download(data){
        const blob = new Blob([data], {type: 'text/csv'})
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('hidden', '')
        a.setAttribute('href', url)
        a.setAttribute('download', 'rushing.csv')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    render(){
        return(
            <div id="actions">
                <div>
                    <input type="text" id="searchInput" onChange={(e) => this.handleSearch(e)} placeholder="Search…"/>
                </div>
                <div className="button">
                    <Button onClick={() => this.convertToCSV()} id="downloadButton" variant="outlined" color="inherit">Export to CSV</Button>
                </div>
            </div>
        )
    }
}

TableAction.propTypes = {
    orderBy: PropTypes.string,
    searchPlayer: PropTypes.string,
    search: PropTypes.func,
    page: PropTypes.func
}

const mapStateToProps = (state, props) => {
    return {
        orderBy: state.data.ordering,
        searchPlayer: state.data.search,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        search: (s) => dispatch(search(s)),
        page: (p) => dispatch(page(p))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TableAction)