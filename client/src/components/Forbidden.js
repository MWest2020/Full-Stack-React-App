import React from 'react'
import { Link } from 'react-router-dom';

export default function Forbidden() {
    return (
        <div>
            <h1>You don't have permission to access these courses.</h1>
            <Link to="/" className="button button-secondary" >Return to List</Link>
        </div>
    )
}
