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
    const navigator = useNavigate(); 

    const handlePassword = (e) => setPassword(e.target.value);
    const handleSamePassword = (e) => setSamePassword(e.target.value);

    useEffect(() => {
        if(email){
            getUserByEmail(email).then((response) => {
                setPassword(response.data.password);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {password}
        console.log(user)

        if(validateForm()){
            try {
                const response = await updatePassword(email, user);
                if (response.data) {
                    // Emailul există
                    navigator('/login');
                } else {
                    // Emailul nu există
                    alert('Email does not exist');
                }
            } catch (error) {
                // Eroare de rețea sau eroare de server
                alert('An error occurred: ' + error.message);
            }
        }
    }; 
    
    
    const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!password || !password.trim()) { // Verificăm dacă parola este nedefinită sau goală
        errorsCopy.password = "Password is required";
        valid = false;
    } else {
        errorsCopy.password = '';
    }
    
    if (!samePassword || !samePassword.trim()) { // Verificăm dacă parola este nedefinită sau goală și pentru câmpul de confirmare a parolei
        errorsCopy.samePassword = "Same password is required";
        valid = false;
    } else if (password !== samePassword) {
        alert("Passwords dosen't match");
        valid = false;
    } else {
        errorsCopy.samePassword = '';
    }

    setErrors(errorsCopy);

    return valid;
}

    

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'> Set new password</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-laber'>Password:</label>
                                <input 
                                type='password'
                                placeholder='Enter your password'
                                name='password' 
                                value={password ? password : ''}
                                className={`form-control ${errors.password ? 'is-invalid': ''}`}
                                onChange={handlePassword}
                                />

                                {errors.password && <div className='invalid-feedback'> {errors.password} </div>}
                            </div> 

                            <div className='form-group mb-2'>
                                <label className='form-laber'>Same password:</label>
                                <input 
                                    type='password'
                                    placeholder='ReEnter your password'
                                    name='samePassword' 
                                    value={samePassword}
                                    className={`form-control ${errors.samePassword ? 'is-invalid': ''}`}
                                    onChange={handleSamePassword}
                                />
                                {errors.samePassword && <div className='invalid-feedback'> {errors.samePassword} </div>}
                            </div> 

                            <button className='btn btn-success' onClick={handleSubmit}> Submit  </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordComponent;
