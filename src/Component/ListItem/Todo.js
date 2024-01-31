import React from 'react'
import "./styles.css"
import { FaTrashCan } from "react-icons/fa6";

function Todo({ todo, toggleComplete , deleteTodo }) {
    return (
        <>
        <li className={todo.completed ? `list` : `list-completed`}>
            <input type='checkbox' className='inpt-chk' checked={todo.completed ? `checked` : ``} 
            onChange={()=>toggleComplete(todo)}
            />
            {todo.completed ?  <p className='text'><s>{todo.text}</s></p>  : <p className='text'>{todo.text}</p> }
           &nbsp; &nbsp;
            <button className='btn-list'onClick={()=>deleteTodo(todo.id)}>{<FaTrashCan />}</button>
        </li>
        <hr/> 
    </>
    )
}

export default Todo;
