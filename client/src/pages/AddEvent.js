import React from 'react'
import { useState } from 'react'

const AddEvent = ({populateTodo}) => {
    const [title, settitle] = useState('')
    const [des, setdes] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/todo/add',{
            method:'POST',
            headers: {
                'x-access-token' : localStorage.getItem('token'),
                 'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title,
                des
            })
        })

        const data = await res.json()
        console.log(data);
        if(data.status === 'ok'){
            populateTodo();
            settitle('')
            setdes('')
        }
        else{
            alert(data.error)
        }
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" value={title} onChange={(e) => settitle(e.target.value)}/> <br/>
                <input type="text" placeholder="description" value={des} onChange={(e) => setdes(e.target.value)}/> <br/>
                <input type="submit" value="post"/>
            </form>
        </div>
    )
}

export default AddEvent
