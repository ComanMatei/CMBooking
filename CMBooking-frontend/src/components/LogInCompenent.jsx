import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    // Redirect to the home page or any other appropriate route
                    navigator('/');
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
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'> Please Log In</h2>
                    <div className='card-body'>
                        <form>
                        <div className='form-group mb-2'>
                                <label className='form-laber'>Email:</label>
                                <input 
                                type='email'
                                placeholder='Enter your email'
                                name='email' 
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid': ''}`}
                                onChange={handleEmail}
                                >
                                </input>
                                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div> 

                            <div className='form-group mb-2'>
                                <label className='form-laber'>Password:</label>
                                <input 
                                type='password'
                                placeholder='Enter your password'
                                name='password' 
                                value={password}
                                className={`form-control ${errors.password ? 'is-invalid': ''}`}
                                onChange={handlePassword}
                                >
                                </input>
                                {errors.password && <div className='invalid-feedback'> {errors.password} </div>}
                            </div> 

                            <button className='btn btn-success' onClick={login}> Log In  </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default LogInComponent;
