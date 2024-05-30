import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { createProperty, assignOwnerAndImageToProperty, findByLocation } from '../service/PropertyService';
import { createImage } from '../service/ImageService';
import { getUser } from '../service/UserService';

const CreatePropertyComponent = () => {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availableSpots, setAvailableSpots] = useState('');
  const [userEmail, setUserEmail] = useState([]);
  const [images, setImages] = useState([]);

  const { email, id } = useParams();

  useEffect(() => {
    if (email) {
      getUser(email).then((response) => {
        setUserEmail(response.data.email);
      })
    }
  }, [email])

  const [errors, setErrors] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    availableSpots: '',
    image: '',
    user: '',
  });

  const navigator = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleAvailableSpots = (e) => setAvailableSpots(e.target.value);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    const selectedImages = files.slice(0, 2);

    if (images.length + selectedImages.length > 2) {
      alert('You can select only two images');
    } else {
      setImages(prevImages => [...prevImages, ...selectedImages]);
    }
  };


  const registrationForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const property = { name, location, description, price, availableSpots };

      try {
        const response = await findByLocation(location);
        if (response.data.message === "Location exist") {
          alert("This location is already associated with another property!");
          return;
        }
      } catch (error) {
        console.error('Error checking location:', error);
        return;
      }

      const formData = new FormData();

      images.forEach((image, index) => {
        formData.append(`image${index + 1}`, image);
      });

      try {
        const [imageResponse, propertyResponse] = await Promise.all([
          createImage(formData),
          createProperty(property)
        ]);

        const userId = userEmail;

        await assignOwnerAndImageToProperty(userId, propertyResponse.data.id);

        navigator(`/main/${email}`);
      } catch (error) {
        console.error('Error creating image and property:', error);
      }
    }
  };

  const validateName = (name) => {
    const regex = /^[A-Za-z\s&]+$/;
    return regex.test(name);
  }

  const validateLocation = (location) => {
    return /^[a-zA-Z0-9\-. ]+$/.test(location);
  }

  const validateDigits = (age) => {
    return /^\d+$/.test(age);
  }

  const validatePrice = (price) => {
    return /^\d+\.\d{2}$/.test(price);
  };

  const validateDescription = (description) => {
    const regex = /^[a-zA-Z0-9\s.,!?'()\-/%$&ăâîșțĂÂÎȘȚ]+$/;
    return regex.test(description);
  };

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      if (validateName(name)) {
        errorsCopy.name = '';
      } else {
        errorsCopy.name = 'The field must not contain symbols';
        valid = false;
      }
    } else {
      errorsCopy.name = 'Name is required';
      valid = false;
    }

    if (location.trim()) {
      if (validateLocation(location)) {
        errorsCopy.location = '';
      }
      else {
        errorsCopy.location = 'The fields can contains Aa-zZ, 0-9, -.';
        valid = false;
      }
    } else {
      errorsCopy.location = 'Location is required';
      valid = false;
    }

    if (description.trim()) {
      if (validateDescription(description)) {
        errorsCopy.description = '';
      }
      else {
        errorsCopy.description = "Description can contain a-zA-Z .,!?'() %$&";
        valid = false;
      }
    } else {
      errorsCopy.description = 'Description is required';
      valid = false;
    }

    if (price.trim()) {
      if (validatePrice(price)) {
        errorsCopy.price = '';
      }
      else {
        errorsCopy.price = 'Price must have two decimal';
        valid = false;
      }
    } else {
      errorsCopy.price = 'Price is required';
      valid = false;
    }

    if (availableSpots.trim()) {
      if (validateDigits(availableSpots)) {
        errorsCopy.availableSpots = '';
      }
      else {
        errorsCopy.availableSpots = 'The field must contain digits';
        valid = false;
      }
    } else {
      errorsCopy.availableSpots = 'Available spots is required';
      valid = false;
    }

    if (images.length !== 2) {
      alert('Two images are required');
      valid = false;
    } else {
      errorsCopy.image = '';
    }

    setErrors(errorsCopy);

    return valid;
  }

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const renderImageRemovalButton = (index) => (
    <button
      type="button"
      className="btn btn-danger btn-sm mt-1"
      onClick={() => removeImage(index)}
    >
      Remove
    </button>
  );

  return (
    <div className='background-property'>
      <div className='container'>
        <br />
        <div className='card col-md-5 mx-auto'>
          <div className='card-body customs-cardprop'>
            <h2 className='text-center' style={{ fontWeight: 'bold' }}> Create property </h2>
            <form>

              <div className="row">
                <div className="col-md-6">
                  <div className='form-group'>
                    <label style={{ fontWeight: 'bold' }}>Name:</label>
                    <input
                      type='text'
                      placeholder='Enter name'
                      name='name'
                      value={name}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      onChange={handleName}
                      style={{ fontWeight: 'bold' }}
                    />
                    {errors.name && <div className='invalid-feedback'> {errors.name} </div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='form-group'>
                    <label style={{ fontWeight: 'bold' }}>Location:</label>
                    <input
                      type='text'
                      placeholder='Enter location'
                      name='location'
                      value={location}
                      className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                      onChange={handleLocation}
                      style={{ fontWeight: 'bold' }}
                    />
                    {errors.location && <div className='invalid-feedback'> {errors.location} </div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className='form-group'>
                    <label style={{ fontWeight: 'bold' }}>Price:</label>
                    <input
                      type='text'
                      placeholder='Enter price/night'
                      name='price'
                      value={price}
                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                      onChange={handlePrice}
                      style={{ fontWeight: 'bold' }}
                    />
                    {errors.price && <div className='invalid-feedback'> {errors.price} </div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='form-group'>
                    <label style={{ fontWeight: 'bold' }}>Spots number:</label>
                    <input
                      type='text'
                      placeholder='Enter spot number'
                      name='availableSpotsr'
                      value={availableSpots}
                      className={`form-control ${errors.availableSpots ? 'is-invalid' : ''}`}
                      onChange={handleAvailableSpots}
                      style={{ fontWeight: 'bold' }}
                    />
                    {errors.availableSpots && <div className='invalid-feedback'> {errors.availableSpots} </div>}
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <label style={{ fontWeight: 'bold' }}>Description:</label>
                <textarea
                  placeholder='Hi, this is my property description'
                  name='description'
                  value={description}
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  onChange={handleDescription}
                  style={{ height: '70px', resize: 'none' }}
                  maxLength={255}
                />
                {errors.description && <div className='invalid-feedback'> {errors.description} </div>}
              </div>

              <div className="my-3 d-flex justify-content-center">
                <div className="w-100" style={{ maxWidth: '134px' }}>
                  <label htmlFor="image" className="btn btn-outline-secondary btn-block" style={{ fontWeight: 'bold' }}>
                    Upload 2 files
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    multiple
                    required
                    onChange={handleImage}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              {images.length > 0 && (
                <div className="mt-3 text-center">
                  <h5 style={{ fontWeight: 'bold' }}>Selected Images:</h5>
                  <div className="d-flex justify-content-center flex-wrap">
                    {images.map((image, index) => (
                      <div key={index} className="mr-2 mb-2" style={{ marginRight: '20px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', marginBottom: '10px' }}>
                          <img src={URL.createObjectURL(image)} alt={image.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                        </div>
                        <div className="text-center mt-1">
                          {renderImageRemovalButton(index)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <button className='btn-success btn-customprop col-8 mt-2' style={{ display: 'block', margin: '0 auto' }} onClick={registrationForm}> Register </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )


}

export default CreatePropertyComponent;
