import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import useForm from '../../hooks/useForm.js';

const initialValues = {
  email: '',
  password: '',
  name: '',
  avatar: '',
};

function RegisterModal({ isOpen, onRegister, onClose, onSwitchToLogin }) {
  const { values, handleChange, handleReset } = useForm(initialValues);
  const [error, setError] = useState('');

  const isFormValid =
    values.email && values.password && values.name && values.avatar;

  const resetForm = () => {
    handleReset();
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchToLogin = () => {
    resetForm();
    onSwitchToLogin();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    onRegister(values)
      .then(resetForm)
      .catch((err) => {
        if (err.status === 409) {
          setError('A user with this email already exists');
        } else {
          setError('Something went wrong, please try again');
        }
      });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      name="register"
      buttonText="Sign Up"
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      afterSubmit={
        <button
          type="button"
          className="modal__auth-toggle"
          onClick={handleSwitchToLogin}
        >
          or Log In
        </button>
      }
    >
      <div className="form__field">
        <label className="form__label" htmlFor="register-email">
          Email*
        </label>
        <input
          className="form__input"
          id="register-email"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="register-password">
          Password*
        </label>
        <input
          className="form__input"
          id="register-password"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="register-name">
          Name*
        </label>
        <input
          className="form__input"
          id="register-name"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="register-avatar">
          Avatar URL*
        </label>
        <input
          className="form__input"
          id="register-avatar"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default RegisterModal;
