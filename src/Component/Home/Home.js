import './home.css';
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from 'react';
import Todo from '../ListItem/Todo';
import { collection, query, updateDoc, doc, getDocs, where, arrayUnion } from 'firebase/firestore';
import { db } from '../../Firebase/firebase'
//import { getAuth } from 'firebase/auth';

export default function Home({ user }) {

  const [input, setInput] = useState([]);
  const [todos, setTodos] = useState([]);
  const [docId, setDocId] = useState('');


  //Read todo from firebase
  const getTodos = async (userId) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'todos'), where('userId', '==', userId)));
      const Usertodos = [];
      querySnapshot.forEach((doc) => {
        const todosData = doc.data().todos; // Access the 'todos' field from the document
        Usertodos.push(...todosData);
        setDocId(doc.id);
      });
      setTodos(Usertodos);

      return Usertodos;
    } catch (error) {
      console.error("Error getting documents: ", error);
      return [];
    }
  }


  useEffect(() => {
    getTodos(user.uid)
  }); // Add user.uid as a dependency

  const createTodo = async (e) => {
    e.preventDefault();
    if (input.length === 0) {
      alert("Please enter todo")
      return
    }
    try {
      const todo = {
        task: input,
        completed: false
      };
      const todoRef = doc(db, 'todos', docId);
      await updateDoc(todoRef, {
        todos: arrayUnion(todo)
      });
      setInput('');
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  const toggleComplete = async (index) => {
    try {
      const updatedTodos = [...todos]; // Create a copy of todos array
      updatedTodos[index].completed = !updatedTodos[index].completed; // Toggle the completed status

      const todoRef = doc(db, 'todos', docId);
      await updateDoc(todoRef, {
        todos: updatedTodos
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error toggling todo completion: ", error);
    }
  }


  //Delete todo 

  const deleteTodo = async (index) => {
    try {
      const updatedTodos = [...todos];
      updatedTodos.pop(index);

      const todoRef = doc(db, 'todos', docId);
      await updateDoc(todoRef, {
        todos: updatedTodos
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  }

  return (
    <>

      <div className="App">
        <br /> <br />
        <div className='container'>
          <div>
            <h1 className='heading'>Todo App</h1>
            <h3 className='heading'>Hello {user.email}</h3>
            <br />
            <form className='form' onSubmit={createTodo}>
              <div className='input-add-button'>
                <input
                  type='text'
                  placeholder='Add Todo'
                  className='input'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className='btn' type='submit'><AiOutlinePlus size={25} /></button>
              </div>
            </form>
          </div>
        </div>
        <div>
            {todos.map((todo, index) => (

              <Todo key={index + todo.text} todo={todo} toggleComplete={() => toggleComplete(index)} deleteTodo={deleteTodo} />
            ))}

            {todos.length >= 1 ? <p className="count">You have {todos.length} todo(s)</p> : <p className="count" >You have no todos</p>}
          </div>
      </div>
    </>


  );
}

