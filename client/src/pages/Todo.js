import React from 'react'
import jwt from 'jsonwebtoken'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router' 
import AddEvent from './AddEvent'
import Event from './Event'

const Todo = () => {
    const history = useHistory();
    const [list, setlist] = useState([])

    const populateTodo = async() => {
        const res = await fetch('http://localhost:5000/api/todo',{
            headers:{
                'x-access-token' : localStorage.getItem('token')
            }
        })
        const data = await res.json()
        console.log(data);
        if(data.status === 'ok'){
            setlist(data.list)
        }
        else{
            alert(data.error)
        }
    }
    useEffect(() => {
       const token = localStorage.getItem('token');
       if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem(token)
                history.replace('/login')
            }
            else{
                populateTodo()
            }
       }
    }, [])


    const onDelete = async(id) => {
        const res = await fetch(`http://localhost:5000/api/todo/${id}`,{
            method: 'DELETE',
            headers: {
                'x-access-token' : localStorage.getItem('token')
            }
        }) 

        const data = await res.json();
        if(data.status === 'ok'){
            populateTodo();
        }
        else{
            alert(data.error)
        }
    }


    const handleclick = async() => {
        const res = await fetch('http://localhost:5000/api/logout',{
            method: 'PUT',
            headers:{
                'x-access-token' : localStorage.getItem('token')
            }
        })
        const data = await res.json()
        alert(data.status)
        console.log(data);
        localStorage.setItem('token','')
        history.push('/login')
    }

    return (
        <div>
            <AddEvent populateTodo={populateTodo}/>
            <button onClick={handleclick}>LOGOUT</button>
            <h1>TODO List : </h1> 
            {list.map((event)=>(
               <Event key={event._id} event={event} onDelete={onDelete} populateTodo={populateTodo}/> 
            ))}
        </div>
    )
}

export default Todo
