import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";

import { getUser } from "../service/UserService";
import { createRenting } from "../service/RentingService";
import { deleteProperty } from "../service/PropertyService";
import { getRentingByPropertyId } from "../service/RentingService";

const Property = ({ property, onPropertyAdded }) => {
    const { location, availableSpots, name, description, price, user, image } = property;

    const dialogRef = useRef(null);

    const toggleDialog = () => {
        if (!dialogRef.current) {
            return;
        }
        dialogRef.current.hasAttribute('open') ? dialogRef.current.close() : dialogRef.current.showModal();

        setStartDate(new Date());
        setEndDate(new Date());

        const calendarTiles = document.querySelectorAll('.react-calendar__tile');
        calendarTiles.forEach(tile => {
            const date = new Date(tile.getAttribute('aria-label'));
            if (occupiedDates.some(occupiedDate => occupiedDate.toDateString() === date.toDateString())) {
                tile.classList.add('occupied-date');
            }
        });
    };

    const initialStartDate = new Date();
    initialStartDate.setHours(0, 0, 0, 0);

    const initialEndDate = new Date();
    initialEndDate.setDate(initialEndDate.getDate());

    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    const { email } = useParams();
    const [client, setClient] = useState([]);
    useEffect(() => {
        if (email) {
            getUser(email).then((response) => {
                setClient(response.data);
            });
        }
    }, [email]);

    const [occupiedDates, setOccupiedDates] = useState([]);

    useEffect(() => {
        if (property && property.id) {
            getRentingByPropertyId(property.id).then((response) => {
                const rentals = response.data;
                const dates = [];
                rentals.forEach(rental => {
                    const start = new Date(rental.startDate);
                    const end = new Date(rental.endDate);
                    let currentDate = new Date(start);
                    while (currentDate <= end) {
                        dates.push(new Date(currentDate));
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                });
                console.log("Occupied Dates: ", dates);
                setOccupiedDates(dates);
            }).catch(error => {
                console.error("Error fetching occupied dates:", error);
            });
        }
    }, [property]);

    const handleSubmit = () => {
        if (validateForm()) {

            if (isPeriodOccupied(startDate, endDate)) {
                setAlertMessage("Selected period is occupied. Please choose another one!");
                return;
            }

            const adjustedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000);
            const adjustedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000);

            const renting = {
                client,
                property,
                startDate: adjustedStartDate.toISOString(),
                endDate: adjustedEndDate.toISOString(),
                headcount
            };
            console.log(renting);

            createRenting(renting).then((response) => {
                console.log(response.data);

                const newOccupiedDates = [];
                let currentDate = new Date(adjustedStartDate);
                while (currentDate <= adjustedEndDate) {
                    newOccupiedDates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                setOccupiedDates(prevDates => [...prevDates, ...newOccupiedDates]);

                const calendarTiles = document.querySelectorAll('.react-calendar__tile');
                calendarTiles.forEach(tile => {
                    const date = new Date(tile.getAttribute('aria-label'));
                    if (occupiedDates.some(occupiedDate => occupiedDate.toDateString() === date.toDateString())) {
                        tile.classList.add('occupied-date');
                    }
                });

                onPropertyAdded(); // Actualizează lista de proprietăți

            }).catch(error => {
                console.error(error);
                setAlertMessage("Failed to create renting. Please try again.");
            });

            if (dialogRef.current) {
                dialogRef.current.close();
            }
        }
    };

    const isPeriodOccupied = (start, end) => {
        return occupiedDates.some(occupiedDate => {
            const currentDate = new Date(occupiedDate);
            return currentDate >= start && currentDate <= end;
        });
    };

    const deleteProp = (property, client) => {
        if (property.user && property.user.email === client.email) {
            deleteProperty(property.id)
                .then(() => {
                    console.log("Proprietatea cu id-ul", property.id, "a fost ștearsă din baza de date.");
                    onPropertyAdded(); // Actualizează lista de proprietăți
                })
                .catch(error => {
                    console.error("Eroare la ștergerea proprietății cu id-ul", property.id, ":", error);
                });
        }
    };

    const [headcount, setHeadcount] = useState('');
    const [errors, setErrors] = useState({ headcount: '' });
    const [alertMessage, setAlertMessage] = useState("");

    const handleHeadcount = (e) => setHeadcount(e.target.value);

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (headcount.trim()) {
            errorsCopy.headcount = '';
        } else {
            errorsCopy.headcount = 'Headcount is required';
            valid = false;
        }
        if (headcount > availableSpots) {
            errorsCopy.headcount = 'Headcount is bigger then available spots';
            valid = false;
        } else {
            errorsCopy.headcount = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className="property__item" style={{ textDecoration: "none", cursor: "pointer" }}>
            <div className="property__header">
                <div className="property__image" style={{ margin: "10px" }}>
                    {image && <img src={`data:image/png;base64,${image.image1}`} alt={name} style={{ border: "4px solid black", borderRadius: "5px", marginBottom: "10px", maxWidth: "150px" }} />}
                    {image && <img src={`data:image/png;base64,${image.image2}`} alt={name} style={{ border: "4px solid black", borderRadius: "5px", marginBottom: "10px", maxWidth: "150px" }} />}
                    <div className="image__buttons-space"></div>
                    <div className="property__buttons">
                        <button onClick={() => deleteProp(property, client)} className="button-del btn-primary" style={{ marginRight: '10px' }}>Delete</button>
                        <button onClick={toggleDialog} className="button-choose btn-secondary">Rent now!</button>
                    </div>
                </div>
            </div>

            <div className="property__body">
                <div className="property__info">
                    <p style={{ marginBottom: '0.5em', fontSize: 'larger' }}>
                        <i className="bi bi-person" style={{ verticalAlign: 'middle' }}></i>
                        <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>Property Name:</span> {name}
                    </p>
                    <p style={{ marginBottom: '0.5em', fontSize: 'larger' }}>
                        <i className="bi bi-person" style={{ verticalAlign: 'middle' }}></i>
                        <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>Owner:</span> {user ? `${user.firstName} ${user.lastName}` : 'Proprietar necunoscut'}
                    </p>
                    <p className="property_location" style={{ marginBottom: '0.5em', fontSize: 'larger' }}>
                        <i className="bi bi-geo" style={{ marginRight: '0.5em' }}></i>
                        <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>Location:</span> {location}
                    </p>
                    <p className="property_price" style={{ marginBottom: '0.5em', fontSize: 'larger' }}>
                        <i className="bi bi-cash" style={{ verticalAlign: 'middle', marginRight: '0.5em' }}></i>
                        <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>Price/Night:</span> {price}
                    </p>
                    <p className="property_price" style={{ marginBottom: '0.5em', fontSize: 'larger' }}>
                        <i className="bi bi-cash" style={{ verticalAlign: 'middle', marginRight: '0.5em' }}></i>
                        <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>Available Spots:</span> {availableSpots}
                    </p>
                    <p className="property_description" style={{ marginBottom: '0.5em' }}>
                        <i className="bi bi-envelope" style={{ verticalAlign: 'middle', marginRight: '0.5em' }}></i>
                        <span style={{ fontWeight: 'bold', marginRight: '0.5em', fontSize: 'larger' }}>Description:</span> {description}
                    </p>
                </div>
            </div>

            <dialog ref={dialogRef} className="calendar-dialog">
                <Calendar
                    className="custom-calendar"
                    onChange={(value) => {
                        setStartDate(value[0]);
                        setEndDate(value[1]);

                        if (value[0] && value[0].toDateString() !== startDate.toDateString()) {
                            const calendarTiles = document.querySelectorAll('.react-calendar__tile');
                            calendarTiles.forEach(tile => {
                                const date = new Date(tile.getAttribute('aria-label'));
                                if (occupiedDates.some(occupiedDate => occupiedDate.toDateString() === date.toDateString())) {
                                    tile.classList.add('occupied-date');
                                }
                            });
                        }
                    }}
                    value={[startDate, endDate]}
                    selectRange={true}
                    tileClassName={({ date, view }) => {
                        const isSelected = startDate && endDate && date >= startDate && date <= endDate;
                        const isOccupied = occupiedDates.some(occupiedDate => occupiedDate.toDateString() === date.toDateString());
                        const isStart = startDate && date.toDateString() === startDate.toDateString();
                        const isEnd = endDate && date.toDateString() === endDate.toDateString();

                        const isNewStart = startDate && date.toDateString() === startDate.toDateString() && !endDate;

                        const isInRange = isSelected && !isStart && !isEnd;

                        if (isInRange) {
                            return 'selected-range';
                        } else if (isNewStart) {
                            return '';
                        } else if (isOccupied) {
                            return 'occupied-date';
                        } else {
                            return '';
                        }
                    }}
                    tileDisabled={({ date, view }) => {
                        return occupiedDates.some(occupiedDate => occupiedDate.toDateString() === date.toDateString());
                    }}
                />

                {alertMessage && (
                    <div className="alert alert-danger alert-full-width" role="alert">
                        {alertMessage}
                    </div>
                )}
                <form>
                    <div className='form-group mb-2 mx-auto text-center' style={{ width: '35%' }}>
                        <div className='form-group'>
                            <label style={{ fontWeight: 'bold' }}>Headcount:</label>
                            <input
                                type='text'
                                placeholder='Enter count'
                                name='headcount'
                                value={headcount}
                                className={`form-control ${errors.headcount ? 'is-invalid' : ''}`}
                                onChange={handleHeadcount}
                                style={{ fontWeight: 'bold' }}
                            />
                            {errors.headcount && <div className='invalid-feedback'> {errors.headcount} </div>}
                        </div>
                    </div>
                </form>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <button className='btn-success btn-custom col-8 mb-3 mt-4' style={{ display: 'block', margin: '0 auto' }} onClick={handleSubmit}> Finish </button>
                </div>
            </dialog>

        </div>
    );
}

export default Property;
