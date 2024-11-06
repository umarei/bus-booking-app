// src/hooks/useForm.js

import { useState } from 'react';

const useForm = (initialValues = {}, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: fieldValue,
    }));

    if (validate) {
      const validationErrors = validate({ ...values, [name]: fieldValue });
      setErrors(validationErrors || {});
    }
  };

  const handleSubmit = (submitCallback) => (e) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors || {});
      if (Object.keys(validationErrors).length === 0) {
        submitCallback();
      }
    } else {
      submitCallback();
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
