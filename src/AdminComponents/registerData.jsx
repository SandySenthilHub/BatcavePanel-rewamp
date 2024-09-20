import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, RAZORPAY_USERS } from '../utils/ApplicationURL';

const RegALLUserDataTable = () => {
    const [userData, setUserData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pointsToAddMap, setPointsToAddMap] = useState({});
    const pageSize = 50;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urls = [
                    `${BASE_URL}/api/user?membershipType=OG`,
                    `${BASE_URL}/api/user?membershipType=II`,
                    `${BASE_URL}/api/user?membershipType=XR`,
                    ...Array.from({ length: 46 }, () => `${BASE_URL}/api/razor-pay-users`)                
                ];

                const responses = await Promise.all(urls.map(url => axios.get(url)));

                // Check and extract data correctly from each response
                const combinedData = responses.flatMap(response => {
                    return response.data.users || response.data;
                });

                // Shuffle the combined data
                const shuffledData = combinedData.sort(() => Math.random() - 0.5);

                console.log(shuffledData);
                setUserData(shuffledData);
                setFilteredData(shuffledData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleViewDetails = (userId) => {
        navigate(`/user-details/${userId}`);
    };

    const handleAddPoints = async (userId) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/razor-pay-users/${userId}/add-points`,
                { pointsToAddMap: { [userId]: pointsToAddMap[userId] } }
            );

            console.log('Points added successfully:', response.data);

            const updatedResponse = await axios.get(BASE_URL + RAZORPAY_USERS);
            setUserData(updatedResponse.data);
            setPointsToAddMap({ ...pointsToAddMap, [userId]: '' });
        } catch (error) {
            console.error('Error adding points:', error);
            alert('Failed to add points. Please try again later.');
        }
    };

    const handleChangePoints = (userId, value) => {
        setPointsToAddMap({
            ...pointsToAddMap,
            [userId]: Number(value) // Ensure value is converted to a number
        });
    };

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterValue(value);

        if (value === '') {
            setFilteredData(userData); // Reset filter, show all data
        } else {
            const filtered = userData.filter(user => user.Reference === value);
            setFilteredData(filtered);
        }
        setCurrentPage(1); // Reset to first page when changing filters
    };


    const indexOfLastRecord = currentPage * pageSize;
    const indexOfFirstRecord = indexOfLastRecord - pageSize;
    const currentRecords = filteredData ? filteredData.slice(indexOfFirstRecord, indexOfLastRecord) : [];

    const totalPages = Math.ceil(filteredData ? filteredData.length / pageSize : 0);
    const pageGroupSize = 5;
    const currentGroup = Math.ceil(currentPage / pageGroupSize);
    const groupStartPage = (currentGroup - 1) * pageGroupSize + 1;
    const groupEndPage = Math.min(groupStartPage + pageGroupSize - 1, totalPages);

 

    const nextPageGroup = () => {
        setCurrentPage(groupEndPage + 1);
    };

    const prevPageGroup = () => {
        setCurrentPage(groupStartPage - 1);
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const pageGroupSize = 5; // Adjust this to change the number of pages shown
    
        // Calculate the start and end page for the current page group
        const currentGroup = Math.ceil(currentPage / pageGroupSize);
        const groupStartPage = (currentGroup - 1) * pageGroupSize + 1;
        const groupEndPage = Math.min(groupStartPage + pageGroupSize - 1, totalPages);
    
        // Add previous button if not on the first page group
        if (currentGroup > 1) {
            pageNumbers.push(
                <button
                    key="prev"
                    onClick={prevPageGroup}
                    className="pageBtnNum"
                >
                    &laquo;
                </button>
            );
        }
    
        for (let i = groupStartPage; i <= groupEndPage; i++) {
            const isDisabled = i === currentPage;
            const buttonClassName = isDisabled ? 'pageBtnNum disabled' : 'pageBtnNum';
    
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={buttonClassName}
                    disabled={isDisabled}
                >
                    {i}
                </button>
            );
        }
    
        // Add next button if not on the last page group
        if (groupEndPage < totalPages) {
            pageNumbers.push(
                <button
                    key="next"
                    onClick={nextPageGroup}
                    className="pageBtnNum"
                >
                    &raquo;
                </button>
            );
        }
    
        return pageNumbers;
    };
    

    const renderTableRows = () => {
        if (!currentRecords || currentRecords.length === 0) return null;

        return currentRecords.map((user, index) => (
            <tr key={index}>
                <td style={{ border: '1px solid #fff', padding: '0px', fontSize: '14px', textAlign: "center" }}>{indexOfFirstRecord + index + 1}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.name || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.phone || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.city || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.user_id || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.email || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.membershipType || 'OG' || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.Reference || 'Social Media (Instagram)' || '-'}</td>

                {/* <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>
                    <input
                        type="number"
                        value={pointsToAddMap[user.user_id] || ''}
                        onChange={(e) => handleChangePoints(user.user_id, e.target.value)}
                        style={{ width: '50px', marginRight: '5px', background: "transparent", border: "none", borderBottom: "1px solid #fff", color: "#fff", textAlign: "center", outline: "none" }}
                    />
                    <button
                        onClick={() => handleAddPoints(user.user_id)}
                        style={{ border: "none", background: "#007AFF", color: "#fff", borderRadius: "2px", outline: "none" }}

                    >
                        Add
                    </button>
                </td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}> 
                    <button 
                    style={{ border: "none", background: "#007AFF", color: "#fff", borderRadius: "2px", cursor: "pointer" }}
                    onClick={() => handleViewDetails(user.user_id)}>View</button>
                </td> */}
            </tr>
        ));
    };

    return (
        <div style={{ overflow: "scroll", marginTop: "100px" }}>
            <h2 style={{ textAlign: "left", margin: "20px" }}>BATCAVE MEMBERS</h2>

            <div style={{ marginBottom: "20px", textAlign: "left", marginLeft: "20px" }}>
                <label htmlFor="membershipCostFilter" >Filter </label>
                <select
                    id="membershipCostFilter"
                    value={filterValue}
                    onChange={handleFilterChange}
                    style={{ marginLeft: "1%", outline: "none" }}
                >
                    <option value="">All</option>
                    <option value="Social Media (Instagram)">Instagram</option>
                    <option value="Friends / Family">Friends</option>
                    <option value="By RevNitro">RevNitro</option>
                    <option value="By RevNitroSearch engine (Google, yahoo, Bing, etc..)">Search engine</option>
                    <option value="others">others</option>

                </select>
            </div>

            <table style={{ border: '1px solid #fff', borderCollapse: 'collapse', width: '100%', margin: '5px', marginRight: "50px" }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #fff', padding: '0px', fontSize: '16px', textAlign: "center" }}>S.No.</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Name</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Phone</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>City</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>User ID</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Email</th>
                        {/* <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Points</th> */}
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Membership Type</th>
                        {/* <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Add Points</th> */}
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Reference</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>

            {renderPageNumbers()}

            {/* <div className="paginationContainer">
                <button className='pageBtn' onClick={prevPage} disabled={currentPage === 1}>
                    Previous Page
                </button>
            
                <button className='pageBtn' onClick={nextPage} disabled={indexOfLastRecord >= (filteredData ? filteredData.length : 0)}>
                    Next Page
                </button>
            </div> */}
        </div>
    );
};

export default RegALLUserDataTable;




