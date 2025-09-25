import React from "react";
import "./About.css";
import aboutBg from "../../assets/aboutBg.avif";
import Button from "../../components/Button/Button";

function About(props) {
  return (
    <div className="about">
      <img src={aboutBg} alt="Background" className="about__bg" />
      <h1 className="about__title">About SATI Lecture Mentor</h1>
      <p className="about__description">
        SATI Lecture Mentor is an AI tool designed to help teachers and
        professors improve their lecture content the SATI way. By analyzing
        uploaded lecture materials, it provides personalized feedback on
        strengths, areas for improvement, and a summary to enhance the overall
        quality of lectures. Our mission is to empower educators with insights
        driven by our custom SATI AI to create more engaging and effective
        learning experiences for their students.
      </p>
    </div>
  );
}

export default About;
