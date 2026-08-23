import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleReset = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleReset, setValues };
}

export default useForm;
