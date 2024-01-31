import React from 'react'
import "./styles.css"

function Button({ title , onClick}) {
    return (
        <div>
            <button className='btn-nav' onClick={onClick}>{title}</button>
        </div>
    )
}
export default Button
