import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div>
            <Link to="/register">Register</Link> <br/>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Home
