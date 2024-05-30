import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from "../service/UserService";

const MainHeaderComponent = () => {
    const { email } = useParams();
    const navigator = useNavigate();

    const createProperty = () => navigator(`/createProperty/${email}`);
    const toLogin = () => navigator('/');
    const toUpdateProfile = () => navigator(`/updateProfile/${email}`);
    const toPropertiesList = () => navigator(`/main/${email}`);
    const toRentingList = () => navigator(`/rentingList/${email}`);

    const [roles, setRoles] = useState('');

    useEffect(() => {
        if (email) {
            getUser(email).then((response) => {
                setRoles(response.data.roles);
            });
        }
    }, [email]);

    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav w-100 justify-content-between">
                            <li className="nav-item">
                                <button className="nav-link btn btn-primary" onClick={toUpdateProfile}>My Profile</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-secondary" onClick={toRentingList}>Renting List</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-primary" onClick={toPropertiesList}>Properties List</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-success" onClick={toLogin}>Log out</button>
                            </li>
                            {roles.id === 2 && (
                                <li className="nav-item">
                                    <button className="nav-link btn btn-purple" onClick={createProperty}>Create Property</button>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default MainHeaderComponent;
