import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  closeModal,
  seeModal,
  handleRegisterSubmit,
  openLoginModal,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterSubmit({ name, email, password });
  };

  // Reset form when modal opens
  useEffect(() => {
    if (seeModal) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [seeModal]);

  const handleLoginClick = () => {
    closeModal();
    openLoginModal();
  };

  return (
    <ModalWithForm
      seeModal={seeModal}
      closeModal={closeModal}
      title="Sign up"
      name="register-modal__form"
      formId="register-modal__form"
      handleFormSubmit={handleSubmit}
      buttonText="Next"
    >
      <label htmlFor="email-input" className="register-modal__label">
        Email*
        <input
          type="email"
          className="register-modal__input"
          id="email-input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <span className="register-modal__input-error" id="email-error"></span>
      </label>
      <label htmlFor="password-input" className="register-modal__label">
        Password*
        <input
          type="password"
          className="register-modal__input"
          id="password-input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength="6"
        />
        <span
          className="register-modal__input-error"
          id="password-error"
        ></span>
      </label>
      <label htmlFor="name-input" className="register-modal__label">
        Name
        <input
          type="text"
          className="register-modal__input"
          id="register-name-input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          minLength="2"
          maxLength="30"
        />
        <span className="register-modal__input-error" id="name-error"></span>
      </label>

      <button
        type="button"
        className="register-modal__login-btn"
        onClick={handleLoginClick}
      >
        or Log in
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
