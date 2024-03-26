import React from 'react'
import Button from '../Button';
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';


function Navbar({ user }) {
    const navigate = useNavigate();

    const LoginClick = () => {
        navigate("/Login")
    }

    const SignupClick = () => {
        navigate("/signup")
    }
    const HomeClick = () => {
        navigate("/Home")
    }

    const LogOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div >
                <nav className="navbar" >
                    <ul className='navbar-ul'>
                        <li className='navbar-li'><a className='navbar-a' href="/" onClick={HomeClick}>Home</a></li>
                        {user ?
                            <Button title="Logout" onClick={LogOut} />
                            :
                            <>
                                <Button onClick={LoginClick} title="Login" />
                                <Button onClick={SignupClick} title="Signup" />
                            </>
                        }
                    </ul>
                </nav>
            </div>

        </>
    );

}


export default Navbar
