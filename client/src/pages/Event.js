import React from 'react'
import { useState } from 'react'
import UpdateEvent from './UpdateEvent'
const Event = ({event,onDelete,populateTodo}) => {
    const [toggle, settoggle] = useState(false)
    return (
        <div>
            <h2>{event.title}</h2>
            <h3>{event.des}</h3>
            <button onClick={() => onDelete(event._id)}>Delete</button>
            <button onClick={() => settoggle(!toggle)}>Update</button>
            {toggle && <UpdateEvent event={event} populateTodo={populateTodo} />}
        </div>
    )
}

export default Event
