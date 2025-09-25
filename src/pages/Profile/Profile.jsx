import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <div className="profile__user">
          <div className="profile__avatar">
            <span>D</span>
          </div>
          <h3 className="profile__username">Day Towns</h3>
        </div>

        <nav className="profile__nav">
          <button className="profile__nav-item profile__nav-item--active">
            My Feedback
          </button>
          <button className="profile__nav-item">Edit Profile</button>
        </nav>
      </div>

      <div className="profile__content">
        <h1 className="profile__title">My Feedback:</h1>

        <div className="profile__lectures">
          <button className="profile__lecture-btn">Lecture 1</button>
          <button className="profile__lecture-btn">Lecture 2</button>
          <button className="profile__lecture-btn">Lecture 3</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
