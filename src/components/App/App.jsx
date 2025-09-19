import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserProvider } from "../../contexts/UserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Profile from "../../pages/Profile/Profile";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
