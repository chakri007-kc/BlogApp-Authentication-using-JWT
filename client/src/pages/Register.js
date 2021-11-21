import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'

const Register = () => {

    const history = useHistory();

    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    const registerUser = async(e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/register',{
            method:'POST',
            headers:{
                'Content-Type' :'application/json',
            },
            body:JSON.stringify({
                    name,
                    email,
                    password
                })
        })
        
        const data = await res.json();
        if(data.status === 'ok'){
            history.push('/login')
            console.log('hi')
        }
    }

    return (
        <div>
             <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input type="text" placeholder="name" value={name} onChange={(e) => setname(e.target.value)}/><br/>
                <input type="email" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)}/><br/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)}/><br/>
                <input type="submit" value="Register"/>
            </form>
        </div>
    )
}

export default Register
