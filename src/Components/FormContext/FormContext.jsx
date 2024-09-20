// FormContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

export function FormProvider({ children }) {
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [carData, setCarData] = useState({});

  useEffect(() => {
    const storedFormState = JSON.parse(localStorage.getItem('formState'));
    if (storedFormState) {
      setShowFirstForm(storedFormState.showFirstForm);
      setShowSecondForm(storedFormState.showSecondForm);
    }
  }, []);

  useEffect(() => {
    const formState = { showFirstForm, showSecondForm ,carData };
    localStorage.setItem('formState', JSON.stringify(formState));
  }, [showFirstForm, showSecondForm , carData]);

  return (
    <FormContext.Provider value={{ showFirstForm, showSecondForm, setShowFirstForm, setShowSecondForm,carData, setCarData }}>
      {children}
    </FormContext.Provider> 
  );
}
