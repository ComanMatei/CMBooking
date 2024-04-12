import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserByEmail } from '../service/UserService';

const VerifyEmailComponent = () => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('')
    const navigator = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(validateForm()){
            try {
                const response = await getUserByEmail(email);
                if (response.data) {
                    // Emailul există
                    navigator(`/updatePassword/${email}`);
                } else 
                if (response.data.message === "Email not exist") {
                    alert("Email does not exist");
                }
            } catch (error) {
                // Eroare de rețea sau eroare de server
                alert('An error occurred: ' + error.message);
            }
        };
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

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'> Enter email</h2>
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
                                />
                                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div> 
    
                            <button className='btn btn-success' onClick={handleSubmit}> Submit  </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailComponent;
