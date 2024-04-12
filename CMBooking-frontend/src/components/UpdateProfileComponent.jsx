import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getUser, updateUser } from '../service/UserService';

const UpdateProfileComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [city, setCity] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [addressStreet, setAddressStreet] = useState('')
    const [addressNumber, setAddressNumber] = useState('')
    const [cui, setCui] = useState('')
    const [roles, setRoles] = useState([]);

    const {email} = useParams();

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
    })

    useEffect(() => {
        if(email){
            getUser(email).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setAge(response.data.age);
                setCity(response.data.city);
                setAddressStreet(response.data.addressStreet);
                setAddressNumber(response.data.addressNumber);
                setUserEmail(response.data.email);
                setRoles(response.data.roles || []);
                setCui(response.data.cui);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [email])
    
     
    const navigator = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleAge = (e) => setAge(e.target.value);
    const handleUserEmail = (e) => setUserEmail(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleAddressStreet = (e) => setAddressStreet(e.target.value);
    const handleAddresssNumber = (e) => setAddressNumber(e.target.value);
    const handleCui = (e) => setCui(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = { firstName, lastName, age, city, userEmail, addressStreet, addressNumber, cui, roles };
        console.log(updatedUser);

        if(email){
            updateUser(email, updatedUser).then((response) => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }; 

    return (
        <div className='container'>
        <br /><br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>

                <h2 className='text-center'> Your profile </h2>

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
                                name='userEmail' 
                                value={userEmail}
                                readOnly
                                className={`form-control ${errors.userEmail ? 'is-invalid': ''}`}
                                onChange={handleUserEmail}
                                >
                                </input>
                                {errors.userEmail && <div className='invalid-feedback'> {errors.userEmail} </div>}
                            </div> 

                            {roles.some(role => role.id === 2) && (
                                <div className='form-group mb-2'>
                                <label className='form-label'>CUI:</label>
                                 <input 
                                type='text'
                                placeholder='Enter your cui'
                                name='cui' 
                                value={cui}
                                readOnly
                                className={`form-control ${errors.cui ? 'is-invalid': ''}`}
                                onChange={handleCui}
                                />
                            {errors.cui && <div className='invalid-feedback'> {errors.cui} </div>}
                            </div>
                    )}


                            <button className='btn btn-success' onClick={handleSubmit}> Save changes </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default UpdateProfileComponent;