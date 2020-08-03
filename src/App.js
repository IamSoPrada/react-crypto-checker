import React, { Component } from 'react';
import ReactPaginate from "react-paginate";
import Spinner from "./spinner/spinner";
import Table from "./table/table";
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
        currentPage: 0
    }


    async componentDidMount() {
        const response = await fetch(`${this._apiBase}`);
        const data = await response.json();

        this.setState({
            isLoading: false,
            data: _.orderBy(data.data, this.state.sortField, this.state.sort)
        })
        console.log(data.data);
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
    
    pageChangeHandler = ({selected}) => {
        this.setState({currentPage: selected})
        console.log(selected)
    }
    render() {
        const pageSize = 50;
        const displayData = _.chunk(this.state.data, pageSize)[this.state.currentPage]
        return (
            <div className="container d-flex flex-column">
                {
                    this.state.isLoading ? <Spinner /> : <Table data={displayData}
                    onSort={this.onSort} 
                    sort = {this.state.sort}
                    sortField = {this.state.sortField}
                    onRowSelect = {this.onRowSelect}/>

                }
                {
                this.state.data.length > pageSize ?
                <ReactPaginate 
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={10}
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
                {
                    this.state.row ? <DetailRowView coin={this.state.row}/> : null
                }
            </div>
        )
    }
}
