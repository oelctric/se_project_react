import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import useForm from '../../hooks/useForm.js';

const initialValues = {
  email: '',
  password: '',
};

function LoginModal({ isOpen, onLogin, onClose, onSwitchToRegister }) {
  const { values, handleChange, handleReset } = useForm(initialValues);
  const [error, setError] = useState('');

  const isFormValid = values.email && values.password;

  const resetForm = () => {
    handleReset();
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchToRegister = () => {
    resetForm();
    onSwitchToRegister();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    onLogin(values)
      .then(resetForm)
      .catch(() => setError('Email or password incorrect'));
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      name="login"
      buttonText="Log In"
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      afterSubmit={
        <button
          type="button"
          className="modal__auth-toggle"
          onClick={handleSwitchToRegister}
        >
          or Sign Up
        </button>
      }
    >
      <div className="form__field">
        <label className="form__label" htmlFor="login-email">
          Email
        </label>
        <input
          className="form__input"
          id="login-email"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="login-password">
          Password
        </label>
        <input
          className="form__input"
          id="login-password"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
