import React, { useState } from 'react';

const DOBInput = () => {
  const [dob, setDOB] = useState('');

  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    // Remove any non-numeric characters
    inputValue = inputValue.replace(/\D/g, '');

    // Format the date as dd/mm/yy
    if (inputValue.length <= 6) {
      const day = inputValue.slice(0, 2);
      const month = inputValue.slice(2, 4);
      const year = inputValue.slice(4, 6);
      inputValue = `${day}${day.length === 2 ? '/' : ''}${month}${month.length === 2 ? '/' : ''}${year}`;
    }

    setDOB(inputValue);
  };

  return (
    <div>

    </div>
    // <input
    //   type="text"
    //   placeholder="dd/mm/yy"
    //   value={dob}
    //   onChange={handleInputChange}
    // />
  );
};

export default DOBInput;
