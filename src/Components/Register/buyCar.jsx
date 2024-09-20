import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { BASE_URL } from '../../utils/ApplicationURL';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const BuyCarData = () => {
    const [carRequests, setCarRequests] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    const [budget, setBudget] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`${BASE_URL}/api/car/requests`);
                // const response = await axios.get(`http://localhost:5000/api/car/requests`);
                const response = await axios.get(`${BASE_URL}/api/car/requests`);


                const data = response.data;
                setCarRequests(data);
                setFilteredData(data); // Initialize filteredData with all car requests
                setTotalCount(data.length); // Total count of car requests
            } catch (error) {
                console.error('Error fetching car requests:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterValue(value);

        if (value === '') {
            setFilteredData(carRequests); // Reset filter, show all data
        } else {
            const filtered = carRequests.filter(request => request.carBrand === value);
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

        return currentRecords.map((request, index) => (
            <tr key={request._id}>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "center" }}>{indexOfFirstRecord + index + 1}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{request.userName}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{request.mobileNumber}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{request.email}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left", textTransform:"capitalize" }}>{request.carType}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{request.carBrand}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{request.budget}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>
                    <Link to={`/car-request/${request._id}`} style={{textDecoration:"none", color:"#ffffff"}}>View Details</Link>
                </td>
            </tr>
        ));
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'table.xlsx');
    };

    return (
        <div style={{ overflow: "scroll", marginTop: "100px" }}>
            <h2 style={{ textAlign: "left", margin: "20px" }}>Car Requests</h2>
            <h2 style={{ textAlign: "left", margin: "20px" }}>Total Requests : {totalCount}</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: "20px" }}>
                <button onClick={exportToExcel} style={{ marginRight: "20px", marginBottom: "10px", padding: "5px 10px", backgroundColor:"#0287D4", border:"none", color:"#FFFFFF", cursor:"pointer" }}>Export to Excel</button>
            </div>

            <table style={{ border: '1px solid #fff', borderCollapse: 'collapse', width: '100%', margin: '5px', marginRight: "50px" }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px', textAlign: "center" }}>S.No.</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>User Name</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Mobile Number</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Email</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Car Type</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Car Brand</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Budget</th>
                        <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Actions</th>
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

export default BuyCarData;
