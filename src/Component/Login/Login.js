import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../../Firebase/firebase";
import Button from '../Button';
import { useNavigate } from "react-router-dom";
import './styles.css'


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Login = async (event) =>{
        event.preventDefault(); 
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.alert("Sign in succesfull");
                navigate('/home');
            }
            catch (error) {
                console.log("error logging in");
                window.alert("Error loggin in");
            }

        }
        else {
            window.alert("All fields are required");
        }


    }
    return (
        <div className='container-login'>
            <form className='container-2-login' onSubmit={Login}>
                <div><h1>Login </h1></div>
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
                <Button title="Login"   />
            </form>
        </div>
    )
}