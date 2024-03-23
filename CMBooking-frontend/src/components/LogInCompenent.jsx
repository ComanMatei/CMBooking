import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LogInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const { id } = useParams();

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const navigator = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const LogIn = (e) => {
        e.preventDefault();

        navigator('/registration');
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
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={handleEmail}
                                />
                                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Password:</label>
                                <input
                                    type='password'
                                    placeholder='Enter your Password'
                                    name='password'
                                    value={password}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    onChange={handlePassword}
                                />
                                {errors.password && <div className='invalid-feedback'> {errors.password} </div>}
                            </div>

                            <button className='btn btn-success' onClick={LogIn}> Log In  </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default LogInComponent;
