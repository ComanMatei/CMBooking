import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByEmail, updatePassword } from '../service/UserService';

const ForgotPasswordComponent = () => {
    const [password, setPassword] = useState('');
    const [samePassword, setSamePassword] = useState('');
    const [errors, setErrors] = useState({
        password: '',
        samePassword: ''
    });

    const { email } = useParams();
    const navigate = useNavigate();

    const handlePassword = (e) => setPassword(e.target.value);
    const handleSamePassword = (e) => setSamePassword(e.target.value);

    useEffect(() => {
        if (email) {
            getUserByEmail(email).then((response) => {
                setPassword(response.data.password);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { password };

        if (validateForm()) {
            try {
                const response = await updatePassword(email, user);
                if (response.data) {
                    navigate('/');
                } else {
                    alert('Email does not exist');
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])(?=.{12,})/;
        return regex.test(password);
    }

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!password || !password.trim()) {
            errorsCopy.password = 'Password is required';
            valid = false;
        } else if (!validatePassword(password)) {
            errorsCopy.password = 'Password must be at least 12 characters, uppercase, lowercase, digits, symbol';
            valid = false;
        } else {
            errorsCopy.password = '';
        }

        if (!samePassword || !samePassword.trim()) { 
            errorsCopy.samePassword = 'Same password is required';
            valid = false;
        } else if (password !== samePassword) {
            errorsCopy.samePassword = 'Passwords do not match';
            valid = false;
        } else {
            errorsCopy.samePassword = '';
        }

        setErrors(errorsCopy);

        return valid;
    };

    return (
        <div className='background-form'>
            <div className='container'>
                <br /><br /> <br /> <br /> <br /> <br />
                <div className='row'>
                    <div className='card col-md-5 mx-auto'>
                        <div className='card-body customs-card'>
                            <h2 className='text-center mb-3' style={{ fontWeight: 'bold' }}> Set new password</h2>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-laber' style={{ fontWeight: 'bold' }}>Password:</label>
                                    <input
                                        type='password'
                                        placeholder='Enter a new password'
                                        name='password'
                                        value={password || ''}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        onChange={handlePassword}
                                        style={{ fontWeight: 'bold' }}
                                    />
                                    {errors.password && <div className='invalid-feedback'> {errors.password} </div>}
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-laber' style={{ fontWeight: 'bold' }}>Same password:</label>
                                    <input
                                        type='password'
                                        placeholder='Enter same password'
                                        name='samePassword'
                                        value={samePassword}
                                        className={`form-control ${errors.samePassword ? 'is-invalid' : ''}`}
                                        onChange={handleSamePassword}
                                        style={{ fontWeight: 'bold' }}
                                    />
                                    {errors.samePassword && <div className='invalid-feedback'> {errors.samePassword} </div>}
                                </div>
                                <button className='btn-success btn-custom col-8 mb-3 mt-4' style={{ display: 'block', margin: '0 auto' }} onClick={handleSubmit}> Submit </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordComponent;
