import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUser, assignRoleToUser, getUserByEmail } from '../service/UserService';

const ClientRegistrationComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [addressStreet, setAddressStreet] = useState('')
    const [addressNumber, setAddressNumber] = useState('')
    const [cui, setCui] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        city: '',
        addressStreet: '',
        addressNumber: '',
        password: '',
        cui: ''
    })

    const navigator = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleAge = (e) => setAge(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleAddressStreet = (e) => setAddressStreet(e.target.value);
    const handleAddresssNumber = (e) => setAddressNumber(e.target.value);
    const handleCui = (e) => setCui(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const registrationForm = async (e) => {
        e.preventDefault();

        if (validateForm()) {

            const user = { firstName, lastName, age, email, city, addressStreet, addressNumber, cui, password }
            console.log(user)

            if (validateAge(age)) {
                alert("Your age is smaller then 18!")
                navigator('/');
                return;
            }

            try {
                const response = await getUserByEmail(email);
    
                if (response.data.message === "Email exist") {
                    alert("This email already exists!");
                    return;
                }
    
                // Create user
                const createUserResponse = await createUser(user);
    
                // Assign roleId(2) to user
                await assignRoleToUser(createUserResponse.data.id, 2);
                navigator('/');
            } catch (error) {
                console.error(error);
            }
        }
    }

    const validateName = (name) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    }

    const validateAge = (age) => {
        return !isNaN(age) && parseInt(age) < 18;
    }

    const validateDigits = (age) => {
        return /^\d+$/.test(age);
    }

    const validateAddressStreet = (street) => {
        return /^[a-zA-Z0-9\-. ]+$/.test(street);
    }

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])(?=.{12,})/;
        return regex.test(password);
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

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

        if (age.trim()) {
            if (validateDigits(age)) {
                errorsCopy.age = '';
            }
            else {
                errorsCopy.age = 'The field must contain digits';
                valid = false;
            }
        } else {
            errorsCopy.age = 'Age is required';
            valid = false;
        }

        if (email.trim()) {
            if (validateEmail(email)) {
                errorsCopy.email = '';
            }
            else {
                errorsCopy.email = 'The fields is not correct';
                valid = false;
            }
        } else {
            errorsCopy.email = 'Email is required';
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
            }
            else {
                errorsCopy.addressStreet = 'The fields can contains Aa-zZ, 0-9, -.';
                valid = false;
            }
        } else {
            errorsCopy.addressStreet = 'Street name is required';
            valid = false;
        }

        if (addressNumber.trim()) {
            if (validateDigits(addressNumber)) {
                errorsCopy.addressNumber = '';
            }
            else {
                errorsCopy.addressNumber = 'The field must contain digits';
                valid = false;
            }
        } else {
            errorsCopy.addressNumber = 'Address number is required';
            valid = false;
        }

        if (cui.trim()) {
            if (validateDigits(cui)) {
                errorsCopy.cui = '';
            }
            else {
                errorsCopy.cui = 'The field must contain digits';
                valid = false;
            }
        } else {
            errorsCopy.cui = 'Business cui is required';
            valid = false;
        }

        if (password.trim()) {
            if (validatePassword(password)) {
                errorsCopy.password = '';
            } else {
                errorsCopy.password = 'Password must be at least 12 characters, uppercase, lowercase, digits, symbol';
                valid = false;
            }
        } else {
            errorsCopy.password = 'Password is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className='background-form'>
            <div className='container'>
                <br /><br /> <br /> <br />
                <div className='row'>
                    <div className='card col-md-5 mx-auto'>
                        <div className='card-body customs-card'>
                            <h2 className='text-center mb-1 mb-4 mt-2' style={{ fontWeight: 'bold' }}> Owner registration </h2>
                            <form>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-laber' style={{ fontWeight: 'bold' }}>First Name:</label>
                                            <input
                                                type='text'
                                                placeholder='Enter first name'
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
                                                placeholder='Enter last name'
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
                                                placeholder='Enter residential city'
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
                                                placeholder='Enter street address'
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
                                                placeholder='Enter address number'
                                                name='addressNumber'
                                                value={addressNumber}
                                                className={`form-control ${errors.addressNumber ? 'is-invalid' : ''}`}
                                                onChange={handleAddresssNumber}
                                                style={{ fontWeight: 'bold' }}
                                            />
                                            {errors.addressNumber && <div className='invalid-feedback'> {errors.addressNumber} </div>}
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-laber' style={{ fontWeight: 'bold' }}>Email:</label>
                                            <input
                                                type='email'
                                                placeholder='Enter email'
                                                name='email'
                                                value={email}
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                onChange={handleEmail}
                                                style={{ fontWeight: 'bold' }}
                                            >
                                            </input>
                                            {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-2'>
                                            <label className='form-laber' style={{ fontWeight: 'bold' }}>Password:</label>
                                            <input
                                                type='password'
                                                placeholder='Enter password'
                                                name='password'
                                                value={password}
                                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                onChange={handlePassword}
                                                style={{ fontWeight: 'bold' }}
                                            >
                                            </input>
                                            {errors.password && <div className='invalid-feedback'> {errors.password} </div>}
                                        </div>
                                    </div>
                                </div>

                                <div className='form-group mb-2 mx-auto text-center' style={{ width: '35%' }}>
                                    <label className='form-label' style={{ fontWeight: 'bold' }}>Cui:</label>
                                    <input
                                        type='text'
                                        placeholder='Enter business cui'
                                        name='cui'
                                        value={cui}
                                        className={`form-control ${errors.cui ? 'is-invalid' : ''}`}
                                        onChange={handleCui}
                                        style={{ fontWeight: 'bold', border: '1px solid #ced4da' }}
                                    />
                                    {errors.cui && <div className='invalid-feedback'> {errors.cui} </div>}
                                </div>


                                <button className='btn-success btn-custom col-8 mb-3 mt-4' style={{ display: 'block', margin: '0 auto' }} onClick={registrationForm}> Register </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientRegistrationComponent;