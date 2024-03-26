import React from 'react'
import "./styles.css"
import { FaTrashCan } from "react-icons/fa6";

function Todo({ todo, toggleComplete, deleteTodo }) {
    return (
        <>
                <div className={todo.completed ? `list` : `list-completed`}>
                    <div className='inpt-chk'>
                        <input
                            type='checkbox'
                            checked={todo.completed ? `checked` : ``}
                            onChange={() => toggleComplete(todo)}
                        />
                    </div>

                    <div className='task-para'>
                        {todo.completed ? <p className='text'><s>{todo.task}</s></p> : <p className='text'>{todo.task}</p>}
                    </div>

                    <div className='delete-btn'>
                        <button className='btn-list' onClick={() => deleteTodo(todo.id)}>{<FaTrashCan />}</button>
                    </div>

                </div>
            <hr />
        </>
    )
}

export default Todo;
