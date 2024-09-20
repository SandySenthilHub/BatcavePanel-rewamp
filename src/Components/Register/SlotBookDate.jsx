import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SlotBook({ date }) {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-dates');
      setDates(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching dates:', error);
      setError('Failed to fetch dates');
    }
  };

  const formatDate = (date) => {
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const handleAddDate = async () => {
    if (!selectedDate) return;

    const formattedDate = formatDate(selectedDate);

    try {
      const response = await axios.post('http://localhost:5000/api/add-date', { date: formattedDate });
      if (response.status === 201) {
        await fetchDates();
        setSelectedDate(null);
        setError(null);
      } else {
        setError('Failed to add date');
      }
    } catch (error) {
      console.error('Error adding date:', error);
      setError('Failed to add date');
    }
  };

  const handleDeleteDate = async (id) => {
    try {
      if (!id) {
        console.error('Invalid date ID:', id);
        return;
      }

      const response = await axios.delete(`http://localhost:5000/api/delete-date/${id}`);
      console.log('Date deletion successful:', response.data);
      
      // Refresh the date list after successful deletion
      await fetchDates();
    } catch (error) {
      console.error('Error deleting date:', error);
      setError('Failed to delete date');
    }
  };

  return (
    <div className="SlotBook">
      <h1>Date Management App</h1>

      {/* Date picker for selecting a new date */}
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="MMMM dd"
        placeholderText="Select a date"
      />

      {/* Button to add the selected date */}
      <button onClick={handleAddDate}>Add Date</button>

      {/* Display existing dates */}
      <div className="dateList">
        <h2>Existing Dates:</h2>
        {error && <p className="error">{error}</p>}
        <ul>
          {dates.map((dateItem, index) => (
            <li key={index}>
              {formatDate(new Date(dateItem.date))}
              <button onClick={() => handleDeleteDate(dateItem._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SlotBook;
