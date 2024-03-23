import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUser, assignRoleToUser } from '../service/UserService';

const OwnerRegistrationComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [addressStreet, setAddressStreet] = useState('')
    const [addressNumber, setAddressNumber] = useState('')
    const [password, setPassword] = useState('')
    const [CUI, setCUI] = useState('')

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        city: '',
        addressStreet: '',
        addressNumber: '',
        password: '',
        CUI: ''
    })
     
    const navigator = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleAge = (e) => setAge(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleAddressStreet = (e) => setAddressStreet(e.target.value);
    const handleAddresssNumber = (e) => setAddressNumber(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleCUI = (e) => setCUI(e.target.value);

    function registrationForm(e) {
        e.preventDefault();

        if(validateForm()){

            const user = {firstName, lastName, age, email, city, addressStreet, addressNumber, password, CUI}
            console.log(user)
            
            // Create user
            createUser(user).then((response) => {
                console.log(response.data);
                //Assign roleId(2) to user
                assignRoleToUser(response.data.id, 2)
                    .then(() => {
                        console.log('Role assigned successfully!');
                        navigator('/');
                    }) 
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (age.trim()) {
            errorsCopy.age = '';
        } else {
            errorsCopy.age = 'Age is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (city.trim()) {
            errorsCopy.city = '';
        } else {
            errorsCopy.city = 'City is required';
            valid = false;
        }

        if (addressStreet.trim()) {
            errorsCopy.addressStreet = '';
        } else {
            errorsCopy.addressStreet = 'Street name is required';
            valid = false;
        }

        if (addressNumber.trim()) {
            errorsCopy.addressNumber = '';
        } else {
            errorsCopy.addressNumber = 'Street number is required';
            valid = false;
        }

        if (password.trim()) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = 'Password is required';
            valid = false;
        }

        if (CUI.trim()) {
            errorsCopy.CUI = '';
        } else {
            errorsCopy.CUI = 'CUI is required';
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

                <h2 className='text-center'> Registretion Formular </h2>

                <div className='card-body'>
                    <form>

                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group mb-2'>
                                    <label className='form-laber'>First Name:</label>
                                    <input 
                                        type='text'
                                        placeholder='Enter your first name'
                                        name='firstName' 
                                        value={firstName}
                                        className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                                        onChange={handleFirstName}
                                    >
                                    </input>
                                    {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='form-group mb-2'>
                                    <label className='form-laber'>Last Name:</label>
                                    <input 
                                        type='text'
                                        placeholder='Enter your last name'
                                        name='lastName' 
                                        value={lastName}
                                        className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                                        onChange={handleLastName}
                                    >
                                    </input>
                                    {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group mb-2'>
                                    <label className='form-laber'>Age:</label>
                                    <input 
                                        type='text'
                                        placeholder='Enter your age'
                                        name='age' 
                                        value={age}
                                        className={`form-control ${errors.age ? 'is-invalid': ''}`}
                                        onChange={handleAge}
                                    />
                                    {errors.age && <div className='invalid-feedback'> {errors.age} </div>}
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='form-group mb-2'>
                                    <label className='form-laber'>City:</label>
                                    <input 
                                        type='text'
                                        placeholder='Enter the city where you live'
                                        name='city' 
                                        value={city}
                                        className={`form-control ${errors.city ? 'is-invalid': ''}`}
                                        onChange={handleCity}
                                    />
                                    {errors.city && <div className='invalid-feedback'> {errors.city} </div>}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Street Address:</label>
                                    <input 
                                        type='text'
                                        placeholder='Enter your street address'
                                        name='addressStreet' 
                                        value={addressStreet}
                                        className={`form-control ${errors.addressStreet ? 'is-invalid': ''}`}
                                        onChange={handleAddressStreet}
                                    />
                                    {errors.addressStreet && <div className='invalid-feedback'> {errors.addressStreet} </div>}
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Address Number:</label>
                                    <input 
                                        type='text'
                                        placeholder='Enter your address number'
                                        name='addressNumber' 
                                        value={addressNumber}
                                        className={`form-control ${errors.addressNumber ? 'is-invalid': ''}`}
                                        onChange={handleAddresssNumber}
                                    />
                                    {errors.addressNumber && <div className='invalid-feedback'> {errors.addressNumber} </div>}
                                </div>
                            </div>
                        </div>

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

                            <div className='form-group mb-2'>
                                <label className='form-laber'>CUI:</label>
                                <input 
                                type='CUI'
                                placeholder='Enter your CUI'
                                name='CUI' 
                                value={CUI}
                                className={`form-control ${errors.CUI ? 'is-invalid': ''}`}
                                onChange={handleCUI}
                                >
                                </input>
                                {errors.password && <div className='invalid-feedback'> {errors.CUI} </div>}
                            </div> 

                                <button className='btn btn-success' onClick={registrationForm}> Register </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerRegistrationComponent;