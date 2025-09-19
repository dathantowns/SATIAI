import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import "./Header.css";
import satiLogo from "../../assets/satiLogo.svg";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img src={satiLogo} alt="Logo" className="header__logo" />
        </Link>
        <Link to="/" className="header__title-link">
          <h1 className="header__title">Lecture Mentor</h1>
        </Link>
      </div>
      <div className="header__nav">
        <ul className="header__nav-list">
          {isSignedIn ? (
            // Navigation for signed-in users
            <>
              <li className="header__nav-item">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="header__nav-item">
                <Link to="/about">About</Link>
              </li>
            </>
          ) : (
            // Navigation for signed-out users
            <>
              <li className="header__nav-item">Login</li>
              <li className="header__nav-item">Sign Up</li>
              <li className="header__nav-item">
                <Link to="/about">About</Link>
              </li>
            </>
          )}
        </ul>
        {isSignedIn && <p className="header__username">User Name</p>}
        {isSignedIn && <div className="header__avatar"></div>}
      </div>
    </header>
  );
}

export default Header;
