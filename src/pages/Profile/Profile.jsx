import React from "react";
import "./Profile.css";
import { getUserFeedback } from "../../../utils/api";
import { useState, useEffect } from "react";
import { useFeedback } from "../../contexts/FeedbackContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ openEditProfileModal }) {
  const { feedback, updateFeedback } = useFeedback();
  const [feedbackArray, setFeedbackArray] = useState([]);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserFeedback().then((data) => {
      setFeedbackArray(data.feedback);
    });
  }, []);

  const handleFeedbackClick = (feedbackItem, index) => {
    updateFeedback(feedbackArray[index].feedback);
    navigate("/feedback");
  };

  return (
    <div className="profile">
      <div className="profile__sidebar">
        <div className="profile__user">
          <h3 className="profile__username">
            {currentUser ? currentUser.name : "Loading..."}
          </h3>
        </div>

        <nav className="profile__nav">
          <button className="profile__nav-item profile__nav-item--active">
            My Feedback
          </button>
          <button className="profile__nav-item" onClick={openEditProfileModal}>
            Edit Profile
          </button>
        </nav>
      </div>

      <div className="profile__content">
        <h1 className="profile__title">My Feedback:</h1>

        <div className="profile__lectures">
          {feedbackArray && feedbackArray.length > 0 ? (
            feedbackArray
              .slice()
              .reverse()
              .map((feedbackItem, index) => (
                <button
                  key={feedbackItem.id || index}
                  className="profile__lecture-btn"
                  onClick={() =>
                    handleFeedbackClick(
                      feedbackItem,
                      feedbackArray.length - 1 - index
                    )
                  }
                >
                  Lecture {index + 1} -{" "}
                  {new Date(feedbackItem.createdAt).toLocaleDateString()}
                </button>
              ))
          ) : (
            <p className="profile__no-lectures">No lectures available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
