import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { FeedbackProvider } from "../../contexts/FeedbackContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Profile from "../../pages/Profile/Profile";
import Upload from "../../pages/Upload/Upload";
import Feedback from "../../pages/Feedback/Feedback";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { login, register } from "../../../utils/auth";
import { getUserData, updateUserData } from "../../../utils/api";

// Inner component that has access to context
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seeLoginModal, setSeeLoginModal] = useState(false);
  const [seeRegisterModal, setSeeRegisterModal] = useState(false);
  const [seeEditProfileModal, setSeeEditProfileModal] = useState(false);
  const routerLocation = useLocation();
  const navigate = useNavigate();
  //RegisterModal functions
  const openRegisterModal = () => {
    setSeeRegisterModal(true);
  };

  const handleRegisterSubmit = (userData) => {
    register(userData)
      .then((registrationResponse) => {
        console.log("Registration successful:", registrationResponse);
        return login({ email: userData.email, password: userData.password });
      })
      .then((loginData) => {
        if (loginData && loginData.token) {
          localStorage.setItem("jwt", loginData.token);
        }
        setSeeRegisterModal(false);
        const token = loginData?.token || localStorage.getItem("jwt");
        if (token) {
          getUserData(token)
            .then((userDataResponse) => {
              console.log(
                "User data fetched after registration:",
                userDataResponse
              );
              setCurrentUser(userDataResponse.data);
              setIsLoggedIn(true);
            })
            .catch((err) => {
              console.error(
                "Failed to fetch user data after registration:",
                err
              );
            });
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };
  // loginModal functions
  const openLoginModal = () => {
    setSeeLoginModal(true);
  };

  const handleLoginSubmit = (credentials) => {
    login(credentials)
      .then(() => {
        setSeeLoginModal(false);
        const token = localStorage.getItem("jwt");
        if (token) {
          getUserData(token)
            .then((userData) => {
              console.log("User data fetched after login:", userData);
              setCurrentUser(userData.data);
              const redirectPath = routerLocation.state?.from?.pathname || "/";
              navigate(redirectPath, { replace: true });
              setIsLoggedIn(true);
            })
            .catch((err) => {
              console.error("Failed to fetch user data after login:", err);
            });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const onClose = () => {
    setSeeLoginModal(false);
    setSeeRegisterModal(false);
    setSeeEditProfileModal(false);
  };

  //editProfile Modal functions
  const openEditProfileModal = () => {
    setSeeEditProfileModal(true);
  };

  const handleEditProfileSubmit = (data) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      updateUserData(token, data)
        .then((res) => {
          setCurrentUser(res.data);
          setSeeEditProfileModal(false);
        })
        .catch((err) => console.error("Edit Profile error:", err));
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((userData) => {
          setCurrentUser(userData.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
          console.error("Token invalid or expired:", err);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <FeedbackProvider>
        <Header
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
        />
        <Main>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Upload /> : <Home seeModal={openRegisterModal} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={
                <Profile
                  openEditProfileModal={openEditProfileModal}
                  handleLogOut={handleLogOut}
                />
              }
            />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Main>
        <Footer />

        <LoginModal
          closeModal={onClose}
          seeModal={seeLoginModal}
          handleLoginSubmit={handleLoginSubmit}
          openRegisterModal={openRegisterModal}
        />

        <RegisterModal
          closeModal={onClose}
          seeModal={seeRegisterModal}
          handleRegisterSubmit={handleRegisterSubmit}
          openLoginModal={openLoginModal}
        />

        <EditProfileModal
          closeModal={onClose}
          seeModal={seeEditProfileModal}
          handleEditProfileSubmit={handleEditProfileSubmit}
        />
      </FeedbackProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
