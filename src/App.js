import React, { Component } from 'react';
import ReactPaginate from "react-paginate";
import Spinner from "./spinner/spinner";
import Table from "./table/table";
import Header from "./header/header";
import TableSearch from "./tableSearch/tablesearch";
import DetailRowView from "./detailrowview/DetailRowView";
import _ from "lodash";
import "./App.css"


export default class App extends Component {

    _apiBase = "https://api.coinlore.net/api/tickers/";

    state = {
        isLoading: true,
        data: [],
        sort: "asc", // desc
        sortField: "id",
        row: null,
        currentPage: 0,
        search: ""
    }


    async componentDidMount() {
        const response = await fetch(`${this._apiBase}`);
        const data = await response.json();

        this.setState({
            isLoading: false,
            data: _.orderBy(data.data, this.state.sortField, this.state.sort)
        })
    }

    
    
    onSort = sortField => {
        const clonedData = this.state.data.concat();
        const sortType = this.state.sort  === "asc" ? "desc" : "asc";

        const orderedData = _.orderBy(clonedData, sortField, sortType);
        this.setState({
            data: orderedData,
            sort: sortType,
            sortField
        })
    }

    onRowSelect = row => {
        this.setState({
            row
        })
    }
    
    onToggleCard = (row) => {
        this.setState({
            row: !row
        })
    }
    pageChangeHandler = ({selected}) => {
        this.setState({currentPage: selected})
        console.log(selected)
    }

    searchHandler = search => {
        this.setState({search, currentPage: 0})
    }

    getFilteredData(){
        const {data, search } = this.state;
        if(!search){
            return data;

        }
        return data.filter(item => {
            return item["name"].toLowerCase().includes(search.toLowerCase()) ||  item["symbol"].toLowerCase().includes(search.toLowerCase())
            
        })
    }

    render() {
        const pageSize = 10;
        const filteredData = this.getFilteredData();
        const pageCount = Math.ceil(filteredData.length / pageSize);
        const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
        return (
            <div className="container d-flex flex-column align-items-center">
                
                <Header title="CRYPTOCURRENCY CHECKER" />
                {
                    this.state.row ? <DetailRowView onToggleCard={this.onToggleCard} coin={this.state.row}/> : null
                }
                {
                    this.state.isLoading ? <Spinner /> : <React.Fragment><TableSearch onSearch = {this.searchHandler} className="wrapper-search" /> <Table data={displayData}
                    onSort={this.onSort} 
                    sort = {this.state.sort}
                    sortField = {this.state.sortField}
                    onRowSelect = {this.onRowSelect}/></React.Fragment>

                }
            
                {
                this.state.data.length > pageSize ?
                <ReactPaginate 
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.pageChangeHandler}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    forcePage={this.state.currentPage}
              /> : null
                }
                
            </div>
        )
    }
}
