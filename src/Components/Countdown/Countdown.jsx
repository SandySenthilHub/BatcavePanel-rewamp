import React, { useState, useEffect } from 'react';
import css from './Countdown.module.css';
import { BASE_URL, COUNT_RAZOR_PAY } from '../../utils/ApplicationURL';

const Countdown = () => {
  const [count, setCount] = useState(0); // Initialize count to 0 initially
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2, response3, response4] = await Promise.all([
          fetch(BASE_URL + COUNT_RAZOR_PAY),
          fetch(BASE_URL + '/api/user?membershipType=II'),
          fetch(BASE_URL + '/api/user?membershipType=OG'),
          fetch(BASE_URL + '/api/user?membershipType=XR'),
        ]);

        // Parse the JSON responses
        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();

        // Combine the counts from all responses
        const combinedCount = data1.count + data2.users.length + data3.users.length + data4.users.length;
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
        setCount(newCount); // Set count to newCount directly
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

export default Countdown;




// import React, { useState, useEffect } from 'react';
// import css from './Countdown.module.css';
// import { BASE_URL, COUNT_RAZOR_PAY } from '../../utils/ApplicationURL';

// const Countdown = () => {
//   const [count, setCount] = useState(0); // Initialize count to 0 initially
//   const [newCount, setNewCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(BASE_URL + COUNT_RAZOR_PAY);
//         // const response = await fetch("http://localhost:5000/api/count/razor-pay");

//         const data = await response.json();
//         setNewCount(data.count);
//         setCount(data.count); // Set count initially to the fetched value
//         localStorage.setItem('count', data.count);
//       } catch (error) {
//         console.error('Error fetching user count:', error);
//       }
//     };

//     fetchData();
//     const intervalId = setInterval(fetchData, 3000);

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     const id = setInterval(() => {
//       if (count !== newCount) {
//         setCount(newCount); // Set count to newCount directly
//         localStorage.setItem('count', newCount);
//       }
//     }, 1000);

//     return () => clearInterval(id);
//   }, [count, newCount]);

//   return (
//     <div className={css.container}>
//       <div className={css.wrap}>
//         <div className={css.counter}>
//           <div className={css.count}>{String(count)}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Countdown;





// import React, { useState, useEffect } from 'react'
// import css from "./Countdown.module.css"
// import { Link } from 'react-router-dom';
// // import Header from "../../assets/Header.png"
// import axios from 'axios'
// import { BASE_URL, COUNT, COUNT_RAZOR_PAY } from '../../utils/ApplicationURL';


// const Countdown = () => {
//   const [count, setCount] = useState(() => {
//     // Initialize count from local storage or default to 0 if not available
//     const storedCount = localStorage.getItem('count');
//     return storedCount ? parseInt(storedCount.replace(/,/g, ''), 10) : 0; // Remove commas before parsing
//   });
//   const [newCount, setNewCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // const response = await fetch('http://localhost:5000/api/count/razor-pay');
//         const response = await fetch(BASE_URL + COUNT_RAZOR_PAY);

//         const data = await response.json();
//         console.log(response)
//         setNewCount(data.count);
//       } catch (error) {
//         console.error('Error fetching user count:', error);
//       }
//     };

//     fetchData();
//     const intervalId = setInterval(fetchData, 3000);

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     const id = setInterval(() => {
//       if (count !== newCount) {
//         setCount((prevCount) => {
//           const nextCount = prevCount + Math.sign(newCount - prevCount);
//           localStorage.setItem('count', (nextCount)); 
//           return nextCount;
//         });
//       }
//     }, 1000);

//     return () => clearInterval(id);
//   }, [count, newCount]);

//   return (
//     <div className={css.container}>
//       <div className={css.wrap}>
//         <div className={css.counter}>
//           <div className={css.count}>{(String(count))}</div>
//         </div>
//       </div>
//     </div>
//   );
// };



// export default Countdown

