import React from 'react'

export default function Header(props) {
    return (
        <div className="container d-flex justify-content-center">
            <h1 className="mt-3">{props.title}</h1>
        </div>
    )
}
