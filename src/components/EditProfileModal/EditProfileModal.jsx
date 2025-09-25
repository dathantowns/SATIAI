import React, { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  closeModal,
  seeModal,
  handleEditProfileSubmit,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (seeModal && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [seeModal, currentUser]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfileSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      seeModal={seeModal}
      closeModal={closeModal}
      title="Change profile data"
      name="edit-profile-modal__form"
      handleFormSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label htmlFor="edit-name-input" className="edit-profile-modal__label">
        Name*
        <input
          type="text"
          className="edit-profile-modal__input"
          id="edit-name-input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className="edit-profile-modal__input-error"
          id="edit-name-error"
        ></span>
      </label>
      <label htmlFor="edit-avatar-input" className="edit-profile-modal__label">
        Avatar URL
        <input
          type="url"
          className="edit-profile-modal__input"
          id="edit-avatar-input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
        <span
          className="edit-profile-modal__input-error"
          id="edit-avatar-error"
        ></span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
