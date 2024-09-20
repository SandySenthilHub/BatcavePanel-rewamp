// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL, RAZORPAY_USERS } from '../../utils/ApplicationURL';
// // import './UserDataTable.css'; // Import CSS file for styling

// const RegUserDataTable = () => {
//     const [userData, setUserData] = useState(null);
//     const [filteredData, setFilteredData] = useState(null);
//     const [filterValue, setFilterValue] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pointsToAddMap, setPointsToAddMap] = useState({});

//     // const [userData, setUserData] = useState([]);
//     // const [filteredData, setFilteredData] = useState([]);
//     const [totalCount, setTotalCount] = useState(0);
//     // const [filterValue, setFilterValue] = useState('');
//     const [cityFilterValue, setCityFilterValue] = useState('');
//     // const [currentPage, setCurrentPage] = useState(1);

//     const pageSize = 20;
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // const response = await axios.get(BASE_URL + RAZORPAY_USERS);
//                 const response = await axios.get("https://api.batcave.club/batcave/api/user?membershipType=II");

//                 setUserData(response.data.users);
//                 setFilteredData(response.data.users);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleViewDetails = (userId) => {
//         navigate(`/user-details/${userId}`);
//     };

//     const handleAddPoints = async (userId) => {
//         try {
//             const response = await axios.put(
//                 `${BASE_URL}/api/razor-pay-users/${userId}/add-points`,
//                 { pointsToAddMap: { [userId]: pointsToAddMap[userId] } }
//             );

//             console.log('Points added successfully:', response.data);

//             const updatedResponse = await axios.get(BASE_URL + RAZORPAY_USERS);
//             setUserData(updatedResponse.data);
//             setPointsToAddMap({ ...pointsToAddMap, [userId]: '' });
//         } catch (error) {
//             console.error('Error adding points:', error);
//             alert('Failed to add points. Please try again later.');
//         }
//     };

//     const handleChangePoints = (userId, value) => {
//         setPointsToAddMap({
//             ...pointsToAddMap,
//             [userId]: Number(value) // Ensure value is converted to a number
//         });
//     };

//     // const handleFilterChange = (event) => {
//     //     const value = event.target.value;
//     //     setFilterValue(value);

//     //     if (value === '') {
//     //         setFilteredData(userData); 
//     //     } else {
//     //         const filtered = userData.filter(user => user.Reference === value);
//     //         setFilteredData(filtered);
//     //     }
//     //     setCurrentPage(1); 
//     // };


//     const handleFilterChange = (event) => {
//         const value = event.target.value;
//         setFilterValue(value);

//         filterData(value, cityFilterValue);
//     };

//     const handleCityFilterChange = (event) => {
//         const value = event.target.value;
//         setCityFilterValue(value);

//         filterData(filterValue, value);
//     };

//     const filterData = (reference, city) => {
//         let filtered = userData;

//         if (reference !== '') {
//             const referenceLower = reference.toLowerCase(); // Convert filter value to lowercase
//             filtered = filtered.filter(user => user.Reference && user.Reference.toLowerCase() === referenceLower);
//         }

//         if (city !== '') {
//             const cityLower = city.toLowerCase(); // Convert filter value to lowercase
//             filtered = filtered.filter(user => user.city && user.city.toLowerCase() === cityLower);
//         }

//         // Sort the filtered data in ascending order
//         filtered = filtered.sort((a, b) => {
//             const nameA = a.name.toLowerCase();
//             const nameB = b.name.toLowerCase();
//             if (nameA < nameB) return -1;
//             if (nameA > nameB) return 1;
//             return 0;
//         });

//         setFilteredData(filtered);
//         setCurrentPage(1);
//     };



//     const indexOfLastRecord = currentPage * pageSize;
//     const indexOfFirstRecord = indexOfLastRecord - pageSize;
//     const currentRecords = filteredData ? filteredData.slice(indexOfFirstRecord, indexOfLastRecord) : [];

//     const totalPages = Math.ceil(filteredData ? filteredData.length / pageSize : 0);
//     const pageGroupSize = 5;
//     const currentGroup = Math.ceil(currentPage / pageGroupSize);
//     const groupStartPage = (currentGroup - 1) * pageGroupSize + 1;
//     const groupEndPage = Math.min(groupStartPage + pageGroupSize - 1, totalPages);



//     const nextPageGroup = () => {
//         setCurrentPage(groupEndPage + 1);
//     };

//     const prevPageGroup = () => {
//         setCurrentPage(groupStartPage - 1);
//     };

//     const goToPage = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         const pageGroupSize = 5; // Adjust this to change the number of pages shown

//         // Calculate the start and end page for the current page group
//         const currentGroup = Math.ceil(currentPage / pageGroupSize);
//         const groupStartPage = (currentGroup - 1) * pageGroupSize + 1;
//         const groupEndPage = Math.min(groupStartPage + pageGroupSize - 1, totalPages);

//         // Add previous button if not on the first page group
//         if (currentGroup > 1) {
//             pageNumbers.push(
//                 <button
//                     key="prev"
//                     onClick={prevPageGroup}
//                     className="pageBtnNum"
//                 >
//                     &laquo;
//                 </button>
//             );
//         }

//         for (let i = groupStartPage; i <= groupEndPage; i++) {
//             const isDisabled = i === currentPage;
//             const buttonClassName = isDisabled ? 'pageBtnNum disabled' : 'pageBtnNum';

//             pageNumbers.push(
//                 <button
//                     key={i}
//                     onClick={() => goToPage(i)}
//                     className={buttonClassName}
//                     disabled={isDisabled}
//                 >
//                     {i}
//                 </button>
//             );
//         }

//         // Add next button if not on the last page group
//         if (groupEndPage < totalPages) {
//             pageNumbers.push(
//                 <button
//                     key="next"
//                     onClick={nextPageGroup}
//                     className="pageBtnNum"
//                 >
//                     &raquo;
//                 </button>
//             );
//         }

//         return pageNumbers;
//     };

//     const renderTableRows = () => {
//         if (!currentRecords || currentRecords.length === 0) return null;

//         return currentRecords.map((user, index) => (
//             <tr key={index}>
//                 <td style={{ border: '1px solid #fff', padding: '0px', fontSize: '14px', textAlign: "center" }}>{indexOfFirstRecord + index + 1}</td>
//                 <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.name || '-'}</td>
//                 <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.phone || '-'}</td>
//                 <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.city || '-'}</td>
//                 <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px', textAlign: "left" }}>{user.user_id || '-'}</td>
//                 <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.email || '-'}</td>
//                 <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.membershipType || '-'}</td>
//                 <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.Reference || '-'}</td>

//                 {/* <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>
//                     <input
//                         type="number"
//                         value={pointsToAddMap[user.user_id] || ''}
//                         onChange={(e) => handleChangePoints(user.user_id, e.target.value)}
//                         style={{ width: '50px', marginRight: '5px', background: "transparent", border: "none", borderBottom: "1px solid #fff", color: "#fff", textAlign: "center", outline: "none" }}
//                     />
//                     <button
//                         onClick={() => handleAddPoints(user.user_id)}
//                         style={{ border: "none", background: "#007AFF", color: "#fff", borderRadius: "2px", outline: "none" }}

//                     >
//                         Add
//                     </button>
//                 </td>
//                 <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}> 
//                     <button 
//                     style={{ border: "none", background: "#007AFF", color: "#fff", borderRadius: "2px", cursor: "pointer" }}
//                     onClick={() => handleViewDetails(user.user_id)}>View</button>
//                 </td> */}
//             </tr>
//         ));
//     };

//     return (
//         <div style={{ overflow: "scroll", marginTop: "100px" }}>
//             <h2 style={{ textAlign: "left", margin: "20px" }}>IGNITION INSIDERS</h2>

//             <div style={{ marginBottom: "20px", textAlign: "left", marginLeft: "20px" }}>
//                 <label htmlFor="membershipCostFilter" >Filter </label>
//                 <select
//                     id="membershipCostFilter"
//                     value={filterValue}
//                     onChange={handleFilterChange}
//                     style={{ marginLeft: "1%", outline: "none" }}
//                 >
// <option value="">All</option>
// <option value="Social Media (Instagram)">Instagram</option>
// <option value="Friends / Family">Friends</option>
// <option value="By RevNitro">RevNitro</option>
// <option value="By RevNitroSearch engine (Google, yahoo, Bing, etc..)">Search engine</option>
// <option value="others">others</option>
// <option value="Coimbatore">Coimbatore</option>


//                 </select>

                // <input
                //     type="text"
                //     placeholder="Filter by City"
                //     value={cityFilterValue}
                //     onChange={handleCityFilterChange}
                //     style={{marginLeft:"20px"}}
                // />
//             </div>



//             <table style={{ border: '1px solid #fff', borderCollapse: 'collapse', width: '100%', margin: '5px', marginRight: "50px" }}>
//                 <thead>
//                     <tr>
//                         <th style={{ border: '1px solid #fff', padding: '0px', fontSize: '16px', textAlign: "center" }}>S.No.</th>
//                         <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Name</th>
//                         <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Phone</th>
//                         <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>City</th>
//                         <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>User ID</th>
//                         <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Email</th>
//                         {/* <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Points</th> */}
//                         <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Membership Type</th>
//                         {/* <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Add Points</th> */}
//                         <th style={{ border: '1px solid #fff', padding: '8px', fontSize: '16px' }}>Reference</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {renderTableRows()}
//                 </tbody>
//             </table>

//             {renderPageNumbers()}

//             {/* <div className="paginationContainer">
//                 <button className='pageBtn' onClick={prevPage} disabled={currentPage === 1}>
//                     Previous Page
//                 </button>
//                 {renderPageNumbers()}
//                 <button className='pageBtn' onClick={nextPage} disabled={indexOfLastRecord >= (filteredData ? filteredData.length : 0)}>
//                     Next Page
//                 </button>
//             </div> */}
//         </div>
//     );
// };

// export default RegUserDataTable;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, RAZORPAY_USERS } from '../../utils/ApplicationURL';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import './UserDataTable.css'; // Import CSS file for styling

const RegUserDataTable = () => {
    const [userData, setUserData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pointsToAddMap, setPointsToAddMap] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const [cityFilterValue, setCityFilterValue] = useState('');
    const pageSize = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.batcave.club/batcave/api/user?membershipType=II");
                setUserData(response.data.users);
                setFilteredData(response.data.users);
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
        filterData(value, cityFilterValue);
    };

    const handleCityFilterChange = (event) => {
        const value = event.target.value;
        setCityFilterValue(value);
        filterData(filterValue, value);
    };

    const filterData = (reference, city) => {
        let filtered = userData;

        if (reference !== '') {
            const referenceLower = reference.toLowerCase(); // Convert filter value to lowercase
            filtered = filtered.filter(user => user.Reference && user.Reference.toLowerCase() === referenceLower);
        }

        if (city !== '') {
            const cityLower = city.toLowerCase(); // Convert filter value to lowercase
            filtered = filtered.filter(user =>
                (user.city && user.city.toLowerCase().includes(cityLower)) ||
                (user.name && user.name.toLowerCase().includes(cityLower)) ||
                (user.phone && String(user.phone).toLowerCase().includes(cityLower)) ||
                (user.user_id && user.user_id.toLowerCase().includes(cityLower))

            );
        }

        // Sort the filtered data in ascending order
        filtered = filtered.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        setFilteredData(filtered);
        setCurrentPage(1);
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
        const pageGroupSize = 5;

        const currentGroup = Math.ceil(currentPage / pageGroupSize);
        const groupStartPage = (currentGroup - 1) * pageGroupSize + 1;
        const groupEndPage = Math.min(groupStartPage + pageGroupSize - 1, totalPages);

        if (currentGroup > 1) {
            pageNumbers.push(
                <button key="prev" onClick={prevPageGroup} className="pageBtnNum">
                    &laquo;
                </button>
            );
        }

        for (let i = groupStartPage; i <= groupEndPage; i++) {
            const isDisabled = i === currentPage;
            const buttonClassName = isDisabled ? 'pageBtnNum disabled' : 'pageBtnNum';

            pageNumbers.push(
                <button key={i} onClick={() => goToPage(i)} className={buttonClassName} disabled={isDisabled}>
                    {i}
                </button>
            );
        }

        if (groupEndPage < totalPages) {
            pageNumbers.push(
                <button key="next" onClick={nextPageGroup} className="pageBtnNum">
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
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.membershipType || '-'}</td>
                <td style={{ border: '1px solid #fff', padding: '8px', fontSize: '14px' }}>{user.Reference || '-'}</td>
            </tr>
        ));
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#userTable' });
        doc.save('table.pdf');
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
            <h2 style={{ textAlign: "left", margin: "20px" }}>IGNITION INSIDERS</h2>
            <div style={{ marginBottom: "20px", textAlign: "left", marginLeft: "20px" }}>
                <label htmlFor="membershipCostFilter">Filter </label>
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
                    {/* <option value="Coimbatore">Coimbatore</option> */}

                </select>

                <input
                    type="text"
                    placeholder="Filter"
                    value={cityFilterValue}
                    onChange={handleCityFilterChange}
                    style={{marginLeft:"20px"}}
                />
            </div>
            {/* <div style={{ marginBottom: "20px", textAlign: "left", marginLeft: "20px" }}>
                <label htmlFor="cityFilter">City: </label>
                <select
                    id="cityFilter"
                    value={cityFilterValue}
                    onChange={handleCityFilterChange}
                    style={{ marginLeft: "1%", outline: "none" }}
                >
                    <option value="">All</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                </select>
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: "20px" }}>
                {/* <button onClick={exportToPDF} style={{ marginLeft: "20px", marginBottom: "10px", padding: "5px 10px" }}>Export to PDF</button> */}
                <button onClick={exportToExcel} style={{ marginRight: "20px", marginBottom: "10px", padding: "5px 10px", backgroundColor:"#0287D4", border:"none", color:"#FFFFFF", cursor:"pointer" }}>Export to Excel</button>
            </div>
            <table
                id="userTable"
                className="userTable"
                style={{
                    border: "1px solid #fff",
                    borderCollapse: "collapse",
                    width: "95%",
                    marginLeft: "1.5%",
                    fontSize: "14px",
                    textAlign: "center"
                   
                }}
            >
                <thead>
                    <tr style={{  color: "#FFFFFF" }}>
                        <th style={{ border: "1px solid #fff", padding: "8px" }}>S.No</th>
                        <th style={{ border: "1px solid #fff", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid #fff", padding: "8px" }}>Phone</th>
                        <th style={{ border: "1px solid #fff", padding: "8px" }}>City</th>
                        <th style={{ border: "1px solid #fff", padding: "8px" }}>User Id</th>
                        <th style={{ border: "1px solid #fff", padding: "8px" }}>Email</th>
                        <th style={{ border: "1px solid #fff", padding: "8px" }}>Membership</th>
                        <th style={{ border: "1px solid #fff", padding: "8px" }}>Reference</th>
                    </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </table>
            <div className="pagination" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                {renderPageNumbers()}
            </div>
        </div>
    );
};

export default RegUserDataTable;



