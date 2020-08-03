import React, { Component } from 'react'
import Spinner from "./spinner/spinner";
import Table from "./table/table";
import DetailRowView from "./detailrowview/DetailRowView";
import _ from "lodash";


export default class App extends Component {
    
    state = {
        isLoading: true,
        data: [],
        sort: "asc", // desc
        sortField: "id",
        row: null
    }


    async componentDidMount() {

        const response = await fetch(`https://api.coinlore.net/api/tickers/`);
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

    render() {
        return (
            <div className="container d-flex flex-column">
                {
                    this.state.isLoading ? <Spinner /> : <Table data={this.state.data}
                    onSort={this.onSort} 
                    sort = {this.state.sort}
                    sortField = {this.state.sortField}
                    onRowSelect = {this.onRowSelect}/>

                }
                {
                    this.state.row ? <DetailRowView coin={this.state.row}/> : null
                }
            </div>
        )
    }
}
