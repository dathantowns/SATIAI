import { useState } from "react";
import "./Header.css";
import satiLogo from "../../assets/satiLogo.svg";

function Header() {
  // For now, using local state - you'd replace this with actual auth state
  const [isSignedIn, setIsSignedIn] = useState(true);

  return (
    <header className="header">
      <div className="header__logo-container">
        <img src={satiLogo} alt="Logo" className="header__logo" />
        <h1 className="header__title">Lecture Mentor</h1>{" "}
      </div>
      <div className="header__nav">
        <ul className="header__nav-list">
          {isSignedIn ? (
            // Navigation for signed-in users
            <>
              <li className="header__nav-item">Profile</li>
              <li className="header__nav-item">About</li>
            </>
          ) : (
            // Navigation for signed-out users
            <>
              <li className="header__nav-item">Login</li>
              <li className="header__nav-item">Sign Up</li>
              <li className="header__nav-item">About</li>
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
