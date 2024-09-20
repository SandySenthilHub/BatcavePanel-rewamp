import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/ApplicationURL';

const CarRequestDetails = () => {
    const { id } = useParams(); // Get the id parameter from the URL
    const [carRequest, setCarRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarRequest = async () => {
            try {
                // const response = await axios.get(`${BASE_URL}/api/car/requests/${id}`);
                // const response = await axios.get(`http://localhost:5000/api/car/requests/${id}`);
                const response = await axios.get(`${BASE_URL}/api/car/requests/${id}`);


                setCarRequest(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCarRequest();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>; // Display loading message while fetching data
    }

    if (error) {
        return <p>Error: {error}</p>; // Display error message if fetching data fails
    }

    if (!carRequest) {
        return <p>No data found for this car request.</p>; // Handle case where no data is found
    }

    return (
        <div style={{ marginTop: '50px' }}>
    <h2>Car Request Details</h2>
    <p><strong>User Name:</strong> {carRequest.userName}</p>
    <p><strong>Mobile Number:</strong> {carRequest.mobileNumber}</p>
    <p><strong>Email:</strong> {carRequest.email}</p>
    <p><strong>Car Type:</strong> {carRequest.carType}</p>
    <p><strong>Car Brand:</strong> {carRequest.carBrand}</p>
    <p><strong>Budget:</strong> {carRequest.budget}</p>
    <p><strong>Additional Requirements:</strong> {carRequest.additionalRequirements}</p>
</div>

    );
};

export default CarRequestDetails;
