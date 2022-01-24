import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'

const Login = () => {

    const history = useHistory()

    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    const LoginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('https://todo-app-006.herokuapp.com/api/login',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()
        console.log(data);
        if(data.user){
            localStorage.setItem('token',data.user)
            alert('login successful')
            const res = await fetch('https://todo-app-006.herokuapp.com/');
            const data1 = await res.json()
            const user = data1.find((k) => k.email === email)
            console.log(user.name)
            history.push(`/${user.name}/Todo`)
        } 
        else{
            alert('Please check your username and password')
        }
    }
    return (
         <div>
             <h1>Login</h1>
            <form onSubmit={LoginUser}>
                <input type="email" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)}/><br/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)}/><br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login
