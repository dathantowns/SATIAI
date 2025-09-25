import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  closeModal,
  seeModal,
  handleLoginSubmit,
  openRegisterModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit({ email, password });
  };

  // Reset form when modal opens
  useEffect(() => {
    if (seeModal) {
      setEmail("");
      setPassword("");
    }
  }, [seeModal]);

  const handleRegisterClick = () => {
    closeModal();
    openRegisterModal();
  };

  return (
    <ModalWithForm
      seeModal={seeModal}
      closeModal={closeModal}
      title="Log in"
      name="login-form"
      formId="login-form"
      handleFormSubmit={handleSubmit}
      buttonText="Log in"
    >
      <label htmlFor="login-email-input" className="login-modal__label">
        Email
        <input
          type="email"
          className="login-modal__input"
          id="login-email-input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <span
          className="login-modal__input-error"
          id="login-email-error"
        ></span>
      </label>
      <label htmlFor="login-password-input" className="login-modal__label">
        Password
        <input
          type="password"
          className="login-modal__input"
          id="login-password-input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength="6"
        />
        <span
          className="login-modal__input-error"
          id="login-password-error"
        ></span>
      </label>

      <button
        type="button"
        className="login-modal__register-btn"
        onClick={handleRegisterClick}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
