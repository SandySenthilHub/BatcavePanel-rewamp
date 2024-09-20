import React, { useState, useEffect } from 'react';
import css from '../Components/Countdown/Countdown.module.css';
import { BASE_URL, COUNT_RAZOR_PAY } from '../utils/ApplicationURL';

const AdminCountdown = () => {
  const [count, setCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const razorPayResponses = await Promise.all(
          Array.from({ length: 46 }, () => fetch(BASE_URL + COUNT_RAZOR_PAY))
        );
  
        const razorPayData = await Promise.all(
          razorPayResponses.map(response => response.json())
        );
  
        // Check if razorPayData is an array of objects
        if (!Array.isArray(razorPayData) || !razorPayData.every(obj => typeof obj === 'object')) {
          throw new Error('Razor Pay data is not in the expected format');
        }
  
        const response2 = await fetch(`${BASE_URL}/api/user?membershipType=II`);
        const response3 = await fetch(`${BASE_URL}/api/user?membershipType=OG`);
        const response4 = await fetch(`${BASE_URL}/api/user?membershipType=XR`);
  
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();
  
        const combinedCount = razorPayData.reduce((acc, curr) => acc + curr.count, 0) +
          data2.users.length + data3.users.length + data4.users.length;
  
        setNewCount(combinedCount);
        setCount(combinedCount);
        localStorage.setItem('count', combinedCount);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
  
    return () => clearInterval(intervalId);
  }, []);
  
  

  useEffect(() => {
    const id = setInterval(() => {
      if (count !== newCount) {
        setCount(newCount);
        localStorage.setItem('count', newCount);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [count, newCount]);

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.counter}>
          <div className={css.count}>{String(count)}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminCountdown;
