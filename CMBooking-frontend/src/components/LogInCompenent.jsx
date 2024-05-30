import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BackGround.css';

const LogInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const navigator = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    async function login(e) {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:8080/api/users/login", {
                    email: email,
                    password: password,
                });

                console.log(response.data);

                if (response.data.message === "Email not exist") {
                    alert("Email does not exist");
                } else if (response.data.message === "Login Success") {
                    navigator(`/main/${email}`);
                } else {
                    alert("Incorrect Email and Password combination");
                }
            } catch (error) {
                alert(error);
            }
        }
    }

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }

        if (password.trim()) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = "Password is required";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className='background-image'>
            <div className='container'>
                <br /> <br /> <br /> <br />
                <div className='row'>
                    <div className='card col-md-4 mx-auto'>
                        <div className='card-body custom-card'>
                            <h2 className='text-center mb-1' style={{ fontWeight: 'bold' }}>Login</h2>
                            <form>
                                <div className='mb-1'>
                                <label htmlFor='email' className='form-label' style={{ fontWeight: 'bold' }}>Email:</label>

                                    <input
                                        type='email'
                                        id='email'
                                        placeholder='Enter your email'
                                        name='email'
                                        value={email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={handleEmail}
                                        style={{ fontWeight: 'bold' }}
                                    />
                                    {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                                </div>
    
                                <div className='mb-1'>
                                    <label htmlFor='password' className='form-label' style={{ fontWeight: 'bold' }}>Password:</label>
                                    <input
                                        type='password'
                                        id='password'
                                        placeholder='Enter your password'
                                        name='password'
                                        value={password}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        onChange={handlePassword}
                                        style={{ fontWeight: 'bold' }}
                                    />
                                    {errors.password && <div className='invalid-feedback'> {errors.password} </div>}
                                </div>
    
                                <div className='d-flex justify-content-between align-items-center mb-2 mt-2 '>
                                    <Link to={'/verify-email'} className="custom-link" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Forgot your password?</Link>
                                </div>
    
                                <div className='text-center mb-3 mt-5'>
                                    <button className='btn-success btn-custom col-8 mb-3' onClick={login}>Login</button>
                                    <p className="mb-0" style={{ fontWeight: 'bold' }}>Not a member? <Link to={'/chooseRegistration'} className="custom-link" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Sign up now</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default LogInComponent;
