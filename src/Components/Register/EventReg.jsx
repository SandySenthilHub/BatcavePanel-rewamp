import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/ApplicationURL';
// import './UserDataTable.css'; // Import CSS file for styling

const EventRegDataTable = () => {
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const pageSize = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2] = await axios.all([


                    axios.get(`${BASE_URL}/api/event/EventOGUser`),
                    axios.get(`${BASE_URL}/api/event/registrations`)
                ]);

                console.log("Response1:", response1.data);
                console.log("Response2:", response2.data);

                const data1 = Array.isArray(response1.data.data) ? response1.data.data : [];
                const data2 = Array.isArray(response2.data.registrations) ? response2.data.registrations : [];
                console.log("Data1:", data1);
                console.log("Data2:", data2);

                const combinedData = [...data1, ...data2];
                setUserData(combinedData);
                setFilteredData(combinedData); // Initialize filteredData with all user data
                console.log("Fetched data: ", combinedData); // Debugging line

                const eventOGUserCount = data1.length;
                console.log("Count of EventOGUsers:", eventOGUserCount);

                const newUsers = data2.reduce((total, item) => total + item.personsCount, 0);
                console.log("Total Persons Count:", newUsers);

                const totalCount = eventOGUserCount + newUsers
                setTotalCount(totalCount);



            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Error request:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                }
                console.error('Error config:', error.config);
            }
        };

        fetchData();
    }, []);




    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterValue(value);

        if (value === '') {
            setFilteredData(userData); // Reset filter, show all data
        } else {
            const filtered = userData.filter(user => user.membershipCost === parseInt(value));
            setFilteredData(filtered);
        }
        setCurrentPage(1); // Reset to first page when changing filters
    };

    const indexOfLastRecord = currentPage * pageSize;
    const indexOfFirstRecord = indexOfLastRecord - pageSize;
    const currentRecords = Array.isArray(filteredData) ? filteredData.slice(indexOfFirstRecord, indexOfLastRecord) : [];

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const nextPage = () => {
        if (indexOfLastRecord < filteredData.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
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
        return pageNumbers;
    };

    const renderTableRows = () => {
        if (!currentRecords || currentRecords.length === 0) return null;

        return currentRecords.map((user, index) => (
            <tr key={user.user_id}>
                <td style={{ border: '1px solid #fff', padding: '0px', fontSize: '14px', textAlign: "center" }}>{indexOfFirstRecord + index + 1}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.name || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.user_id || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.Reference || user.reference || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.ticketId || user.ticketID || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.paymentType || user.total || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.carCount ||  '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.phone ||  '-'}</td>




                {/* <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.user_id || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.invoiceDate || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.points || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.membershipCost || '-'}</td> */}
            </tr>
        ));
    };

    return (
        <div style={{ overflow: "scroll", marginTop: "100px" }}>
            <h2 style={{ textAlign: "left", margin: "20px" }}>Event Registration</h2>
            <h2 style={{ textAlign: "left", margin: "20px" }}>Total Registrations : {totalCount}</h2>

            <table style={{ border: '1px solid #fff', borderCollapse: 'collapse', width: '100%', margin: '5px', marginRight: "50px" }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #fff', padding: '0px', fontSize: '16px', textAlign: "center" }}>S.No.</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Name</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>User ID</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Reference</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Ticket ID</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Payment</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Car Count</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Phone</th>



                        {/* <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>User ID</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Invoice Date</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Points</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Membership Cost</th> */}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>

            <div className="paginationContainer">
                <button className='pageBtn' onClick={prevPage} disabled={currentPage === 1}>
                    Previous Page
                </button>
                {renderPageNumbers()}
                <button className='pageBtn' onClick={nextPage} disabled={indexOfLastRecord >= filteredData.length}>
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default EventRegDataTable;
