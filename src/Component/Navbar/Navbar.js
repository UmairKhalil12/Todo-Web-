import React from 'react'
import Button from '../Button';
import './styles.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const LoginClick = () =>{
        navigate("/Login")
    }

    const SignupClick = () => {
        navigate("/signup")
    }
    const HomeClick = () =>{
        navigate("/Home")
    }

    return (
        <>
            <div >
                <nav className="navbar" >
                    <ul className='navbar-ul'>
                        <li className='navbar-li'><a className='navbar-a' href="/" onClick={HomeClick}>Home</a></li>
                        <li className='navbar-li'><a className='navbar-a' href="/" >About</a></li>
                        <li className='navbar-li'><a className='navbar-a' href="/" >Contact</a></li>
                        <Button onClick={LoginClick}  title="Login"/>
                        <Button onClick={SignupClick}  title="Signup"/> 
                    </ul>
                </nav>
            </div>

        </>
    );

}


export default Navbar
