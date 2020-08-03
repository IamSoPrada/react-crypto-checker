import React from 'react'

export default function Table(props) {
const newDataArr = props.data;
    return (
        
        <table className="table">
            <thead>
                <tr>
                    <th onClick={props.onSort.bind(null,"id")}>ID {props.sortField === "id" ? <small>{props.sort}</small> : null }  </th>
                    <th onClick={props.onSort.bind(null,"symbol")}>Symbol {props.sortField === "symbol" ? <small>{props.sort}</small> : null }</th>
                    <th onClick={props.onSort.bind(null,"name")}>Name {props.sortField === "name" ? <small>{props.sort}</small> : null }</th>
                    <th onClick={props.onSort.bind(null,"rank")}>Rank{props.sortField === "rank" ? <small>{props.sort}</small> : null }</th>
                    <th onClick={props.onSort.bind(null,"price_usd")}>Price USD{props.sortField === "price_usd" ? <small>{props.sort}</small> : null }</th>
                </tr>
            </thead>
            <tbody>
                {newDataArr.map(item => (
                     <tr id={item.id} onClick={props.onRowSelect.bind(null, item)}>
                        <th>{item.id}</th>
                        <th>{item.symbol}</th>
                        <th>{item.name}</th>
                        <th>{item.rank}</th>
                        <th>{item.price_usd}</th>
                 </tr>
                ))}
            </tbody>
        </table>
    )
}
