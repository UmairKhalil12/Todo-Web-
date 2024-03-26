import React, { useState } from 'react'
import Button from '../Button'
import "./styles.css"
// import {auth} from "../../Firebase/Auth"
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db, googleProvider } from "../../Firebase/firebase"
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'

function Signup({ userInfo }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const initialUserTodo = [
        {
            task: '',
            completed: '',
        }
    ]


    const createDb = async (id) => {
        await addDoc(collection(db, 'todos'), {
            todos: initialUserTodo,
            userId: id
        })
    }


    const LoginOnClick = async (event) => {
        event.preventDefault()
        if (email && password) {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
                console.log(userCredentials, 'user cred inside signup');
                window.alert("User created successfully");
                navigate('/home');
                createDb(userCredentials.user.uid);
            })
                .catch((error) => {
                    console.log('error creating user', error);
                    window.alert('error creating user', error);
                })
        }
        else {
            window.alert("All fields are required");
        }

    };

    const LoginWithGoogle = async () => {
      
            await signInWithPopup(auth, googleProvider).then((userCredentials)=>{
                window.alert("User created successfully with google");
                createDb(userCredentials.user.uid);
            })
            .catch((error)=>{
                console.log('error logging with google' , error);
                window.alert('error logging with google' , error); 
            })
    }


    return (
        <div>
            <div className='container-login' >
                <form className='container-2-login' onSubmit={LoginOnClick} >
                    <label htmlFor='email'>Enter your Email</label> <br />
                    <input id='email' type='text'
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>

                    <br /> <br />

                    <label htmlFor='password'>Enter your password</label> <br />
                    <input id='password' type='password'
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                    <br /> <br />

                    <div className='container-login'>
                        <div>
                            <Button title="Signup" /> <br />
                            <Button title="Signup with Google" onClick={LoginWithGoogle} /> <br />

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup; 
