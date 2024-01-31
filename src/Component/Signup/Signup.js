import React, { useState } from 'react'
import Button from '../Button'
import "./styles.css"
// import {auth} from "../../Firebase/Auth"
import {signInWithPopup, createUserWithEmailAndPassword , signOut} from "firebase/auth"
import {auth , googleProvider} from "../../Firebase/firebase"

function Signup() {
    const[email , setEmail] = useState("");
    const[password , setPassword] = useState("");


    const LoginOnClick = async ()=>{
        try{
            await createUserWithEmailAndPassword(auth , email , password);
        } catch(error){
            console.error(error);
        }
    };

    const LoginWithGoogle = async() => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch(error){
            console.error(error); 
        }
    }

    const LogOut = async() =>{
        try{
            await signOut(auth )
        } catch(error){
            console.error(error);
        }
    }
    

    return (
        <div>
            <div className='container-login'>
                <div className='container-2-login'>
                    <label htmlFor='email'>Enter your Email</label> <br />
                    <input id='email' type='text' 
                    onChange={(e)=>setEmail(e.target.value)}>
                    </input> 
                    
                    <br /> <br />

                    <label htmlFor='password'>Enter your password</label> <br />
                    <input id='password' type='password' 
                    onChange={(e)=>setPassword(e.target.value)}>
                    </input> 
                    <br /> <br />

                    <div className='container-login'>
                        <div>
                            <Button title="Signup" onClick={LoginOnClick}  /> <br/>
                            <Button title="Signup with Google" onClick={LoginWithGoogle}/> <br/>
                            <Button title="Logout" onClick = {LogOut} /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup; 
