import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getUser, updateUser } from '../service/UserService';

const UpdateProfileComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [addressStreet, setAddressStreet] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [cui, setCui] = useState('');
    const [roles, setRoles] = useState('');

    const { email } = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        city: '',
        addressStreet: '',
        addressNumber: '',
        cui: '',
        roles: ''
    });

    useEffect(() => {
        if (email) {
            getUser(email).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setAge(response.data.age);
                setCity(response.data.city);
                setAddressStreet(response.data.addressStreet);
                setAddressNumber(response.data.addressNumber);
                setUserEmail(response.data.email);
                setRoles(response.data.roles);
                setCui(response.data.cui);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [email]);

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleAge = (e) => setAge(e.target.value);
    const handleUserEmail = (e) => setUserEmail(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleAddressStreet = (e) => setAddressStreet(e.target.value);
    const handleAddressNumber = (e) => setAddressNumber(e.target.value);
    const handleCui = (e) => setCui(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const updatedUser = { firstName, lastName, age, city, userEmail, addressStreet, addressNumber, cui, roles };
            console.log(updatedUser);

            if (email) {
                updateUser(email, updatedUser).then((response) => {
                    console.log(response.data);
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    };

    const validateName = (name) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    const validateAge = (age) => {
        return !isNaN(age) && parseInt(age) >= 18;
    };

    const validateDigits = (value) => {
        return /^\d+$/.test(value);
    };

    const validateAddressStreet = (street) => {
        return /^[a-zA-Z0-9\-. ]+$/.test(street);
    };

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            if (validateName(firstName)) {
                errorsCopy.firstName = '';
            } else {
                errorsCopy.firstName = 'The field must not contain symbols';
                valid = false;
            }
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            if (validateName(lastName)) {
                errorsCopy.lastName = '';
            } else {
                errorsCopy.lastName = 'The field must not contain symbols';
                valid = false;
            }
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (age) {
            if (validateDigits(age) && validateAge(age)) {
                errorsCopy.age = '';
            } else {
                errorsCopy.age = 'Age must be a number and at least 18';
                valid = false;
            }
        } else {
            errorsCopy.age = 'Age is required';
            valid = false;
        }

        if (city.trim()) {
            if (validateName(city)) {
                errorsCopy.city = '';
            } else {
                errorsCopy.city = 'The field must not contain symbols';
                valid = false;
            }
        } else {
            errorsCopy.city = 'City is required';
            valid = false;
        }

        if (addressStreet.trim()) {
            if (validateAddressStreet(addressStreet)) {
                errorsCopy.addressStreet = '';
            } else {
                errorsCopy.addressStreet = 'The fields can contain Aa-zZ, 0-9, -';
                valid = false;
            }
        } else {
            errorsCopy.addressStreet = 'Street name is required';
            valid = false;
        }

        if (addressNumber) {
            if (validateDigits(addressNumber)) {
                errorsCopy.addressNumber = '';
            } else {
                errorsCopy.addressNumber = 'The field must contain digits';
                valid = false;
            }
        } else {
            errorsCopy.addressNumber = 'Address number is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className='background-form'>
            <div className='container'>
                <br /><br /> <br />
                <div className='row'>
                    <div className='card col-md-5 mx-auto'>
                        <div className='card-body customs-card'>
                            <h2 className='text-center mb-1 mb-4 mt-2' style={{ fontWeight: 'bold' }}>My profile</h2>
                            <form>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-laber' style={{ fontWeight: 'bold' }}>First Name:</label>
                                            <input
                                                type='text'
                                                placeholder='Enter your first name'
                                                name='firstName'
                                                value={firstName}
                                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                onChange={handleFirstName}
                                                style={{ fontWeight: 'bold' }}
                                            >
                                            </input>
                                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-laber' style={{ fontWeight: 'bold' }}>Last Name:</label>
                                            <input
                                                type='text'
                                                placeholder='Enter your last name'
                                                name='lastName'
                                                value={lastName}
                                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                onChange={handleLastName}
                                                style={{ fontWeight: 'bold' }}
                                            >
                                            </input>
                                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-laber' style={{ fontWeight: 'bold' }}>Age:</label>
                                            <input
                                                type='text'
                                                placeholder='Enter your age'
                                                name='age'
                                                value={age}
                                                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                                onChange={handleAge}
                                                style={{ fontWeight: 'bold' }}
                                            />
                                            {errors.age && <div className='invalid-feedback'> {errors.age} </div>}
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-laber' style={{ fontWeight: 'bold' }}>City:</label>
                                            <input
                                                type='text'
                                                placeholder='Enter the city where you live'
                                                name='city'
                                                value={city}
                                                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                                onChange={handleCity}
                                                style={{ fontWeight: 'bold' }}
                                            />
                                            {errors.city && <div className='invalid-feedback'> {errors.city} </div>}
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-label' style={{ fontWeight: 'bold' }}>Street Address:</label>
                                            <input
                                                type='text'
                                                placeholder='Enter your street address'
                                                name='addressStreet'
                                                value={addressStreet}
                                                className={`form-control ${errors.addressStreet ? 'is-invalid' : ''}`}
                                                onChange={handleAddressStreet}
                                                style={{ fontWeight: 'bold' }}
                                            />
                                            {errors.addressStreet && <div className='invalid-feedback'> {errors.addressStreet} </div>}
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-label' style={{ fontWeight: 'bold' }}>Address Number:</label>
                                            <input
                                                type='text'
                                                placeholder='Enter your address number'
                                                name='addressNumber'
                                                value={addressNumber}
                                                className={`form-control ${errors.addressNumber ? 'is-invalid' : ''}`}
                                                onChange={handleAddressNumber}
                                                style={{ fontWeight: 'bold' }}
                                            />
                                            {errors.addressNumber && <div className='invalid-feedback'> {errors.addressNumber} </div>}
                                        </div>
                                    </div>
                                </div>

                                <div className='form-group mb-2 mx-auto text-center' style={{ width: '60%' }}>
                                    <label className='form-laber' style={{ fontWeight: 'bold' }} >Email:</label>
                                    <input
                                        type='email'
                                        placeholder='Enter your email'
                                        name='userEmail'
                                        value={userEmail}
                                        readOnly
                                        className={`form-control ${errors.userEmail ? 'is-invalid' : ''}`}
                                        onChange={handleUserEmail}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                    </input>
                                    {errors.userEmail && <div className='invalid-feedback'> {errors.userEmail} </div>}
                                </div>

                                {(roles.id === 2) && (
                                    <div className='form-group mb-2 mx-auto text-center' style={{ width: '35%' }}>
                                        <label className='form-label' style={{ fontWeight: 'bold' }}>CUI:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter your cui'
                                            name='cui'
                                            value={cui}
                                            readOnly
                                            className={`form-control ${errors.cui ? 'is-invalid' : ''}`}
                                            onChange={handleCui}
                                            style={{ fontWeight: 'bold' }}
                                        />
                                        {errors.cui && <div className='invalid-feedback'> {errors.cui} </div>}
                                    </div>
                                )}

                                <button className='btn-success btn-custom col-8 mb-3 mt-4' style={{ display: 'block', margin: '0 auto' }} onClick={handleSubmit}> Save changes </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default UpdateProfileComponent;