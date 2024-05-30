import React, { useEffect, useState } from "react";
import { deleteRenting, getAllRentings } from "../service/RentingService";
import { useParams } from "react-router-dom";
import "./RentingList.css"; // Importul fișierului CSS pentru stiluri suplimentare

const RentingList = () => {
    const [renting, setRenting] = useState([]);
    const [filteredRenting, setFilteredRenting] = useState([]);
    const { email } = useParams();

    useEffect(() => {
        getAllRentings(email).then((response) => {
            setRenting(response.data);
            setFilteredRenting(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, []);

    useEffect(() => {
        const currentDate = new Date().getTime();

        renting.forEach(renting => {
            const RentingEndDate = new Date(renting.endDate).getTime();
            if (currentDate > RentingEndDate) {
                console.log("ziua curenta este " + new Date(currentDate) + " si " + new Date(RentingEndDate));
                console.log(currentDate > RentingEndDate);
                deleteRenting(renting.id)
                    .then(() => {
                        console.log("Închirierea cu id-ul", renting.id, "a fost ștearsă din baza de date.");
                        setFilteredRenting(filteredRenting.filter(item => item.id !== renting.id));
                    })
                    .catch(error => {
                        console.error("Eroare la ștergerea închirierii cu id-ul", renting.id, ":", error);
                    });
            }
        });
    }, [renting]);

    return (
        <div className="renting-list-container">
            <h2 className="renting-list-heading text-center">My Rentings</h2>
            <div className="renting-list">
                {filteredRenting.map(rentingItem => (
                    <div key={rentingItem.id} className="renting-item">
                        <p className="property-name">{rentingItem.property ? rentingItem.property.name : 'Unknown Property'}</p>
                        <p className="property-info"><i className="bi bi-geo"></i> Start date: {rentingItem.startDate}</p>
                        <p className="property-info"><i className="bi bi-cash"></i> End date: {rentingItem.endDate}</p>
                        <p className="property-info"><i className="bi bi-person"></i> Headcount: {rentingItem.headcount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RentingList;
