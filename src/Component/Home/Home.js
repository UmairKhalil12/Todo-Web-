import '../../App.css';
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from 'react';
import Todo from '../ListItem/Todo';
import { collection, onSnapshot, query, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase'
import { getAuth } from 'firebase/auth';
 
export default function Home() {
    const [todos, setTodos] = useState([])
    const [input , setInput] = useState([])
  
    //Create todo
    const createTodo = async (e) => {
      e.preventDefault();
      if(input.length === 0){
        alert("Please enter todo")
        return 
      }
      await addDoc(collection(db , 'todos'), {
        text : input,
        completed : false 
      })
      setInput("")
    }; 
  
    //Read todo from firebase
    useEffect(() => {
      const q = query(collection(db, 'todos'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id })
        })
        setTodos(todosArray);
      })
      return unsubscribe;
  
    }, [])
  
    // Update todo in firebase
    const toggleComplete = async (todo) => {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed
      });
    };
  
    //Delete todo 
  
    const deleteTodo = async (id) => {
      await deleteDoc(doc(db , 'todos' , id)); 
    }
  
    return (
      <>
     
      <div className="App">
      <br/> <br/> 
        <div className='container'>
          <h3 className='heading'>Todo App</h3>
          <form className='form' onSubmit={createTodo}>
            <input type='text' placeholder='Add Todo' className='input' value={input} 
            onChange={(e)=>setInput(e.target.value)}
            />
            &nbsp; &nbsp;
            <button className='btn' type='submit'><AiOutlinePlus size={25} /></button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
            ))}
            {todos.length > 1 ? <p className="count">You have {todos.length} todos</p> : ""}
          </ul>
        </div> 
      </div>
      </>
      
  
    );
  }

  