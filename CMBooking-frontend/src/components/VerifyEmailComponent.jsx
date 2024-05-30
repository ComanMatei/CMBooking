import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../service/UserService';

const VerifyEmailComponent = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');
    const navigator = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await getUserByEmail(email);

                if (response.data.message === "Email exist") {
                    navigator(`/updatePassword/${email}`);
                } 
                else if(response.data.message === "Email dosen't exist"){
                    alert("Email doesn't exist!");
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    };

    return (
        <div className='background-image'>
            <div className='container'>
                <br /> <br /><br /> <br /> <br /><br />
                <div className='row'>
                    <div className='card col-md-5 mx-auto'>
                        <div className='card-body card-body custom-card'>
                            <h2 className='text-center mb-3' style={{ fontWeight: 'bold' }}>
                                {' '}
                                Verify email{' '}
                            </h2>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-laber' style={{ fontWeight: 'bold' }}>
                                        Email:
                                    </label>
                                    <input
                                        type='email'
                                        placeholder='Enter email'
                                        name='email'
                                        value={email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={handleEmail}
                                        style={{ fontWeight: 'bold' }}
                                    />
                                    {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                                </div>

                                <div className='text-center mb-3 mt-4'>
                                    <button className='btn-success btn-custom col-8' onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailComponent;
