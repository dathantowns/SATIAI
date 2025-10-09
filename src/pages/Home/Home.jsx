import React from "react";
import "./Home.css";
import homeBg from "../../assets/homeBg.avif";
import Button from "../../components/Button/Button";

function Home(props) {
  return (
    <div className="home">
      <img src={homeBg} alt="Background" className="home__bg" />
      <h1 className="home__title">Unlock Understanding.</h1>
      <Button onClick={props.seeModal}>Create Account</Button>
    </div>
  );
}

export default Home;
