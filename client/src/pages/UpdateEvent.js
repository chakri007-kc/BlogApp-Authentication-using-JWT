import React from 'react'
import { useState } from 'react'

const UpdateEvent = ({event,populateTodo}) => {
     const [title, settitle] = useState(event.title)
    const [des, setdes] = useState(event.des)

    const onUpdate = async(e) => {
        e.preventDefault();

        const res = await fetch(`https://todo-app-006.herokuapp.com/api/todo/update/${event._id}`,{
            method:'PUT',
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
            <form onSubmit={onUpdate}>
                <input type="text" placeholder="title" value={title} onChange={(e) => settitle(e.target.value)}/> <br/>
                <input type="text" placeholder="description" value={des} onChange={(e) => setdes(e.target.value)}/> <br/>
                <input type="submit" value="save"/>
            </form>
        </div>
    )
}

export default UpdateEvent
