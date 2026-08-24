import { useContext, useEffect, useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import useForm from '../../hooks/useForm.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

const initialValues = { name: '', avatar: '' };

function EditProfileModal({ isOpen, onUpdateProfile, onClose }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm(initialValues);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({ name: currentUser.name, avatar: currentUser.avatar });
      setError('');
    }
  }, [isOpen, currentUser, setValues]);

  const isFormValid = values.name && values.avatar;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    onUpdateProfile(values).catch(() =>
      setError('Something went wrong, please try again')
    );
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      <div className="form__field">
        <label className="form__label" htmlFor="edit-profile-name">
          Name*
        </label>
        <input
          className="form__input"
          id="edit-profile-name"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="edit-profile-avatar">
          Avatar*
        </label>
        <input
          className="form__input"
          id="edit-profile-avatar"
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

export default EditProfileModal;
