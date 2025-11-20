import React from "react";
import "./Card.css";

const Card = ({ image, title, price }) => {
  return (
    <div className="card-container ">
      <div className="card bg-black">
        <div className="cardimg">
          <img src={image} alt={title} />
        </div>

        <div className="title">
          <p><span>{title}</span></p>
        </div>

        <div className="curve_three"></div>
        <div className="curve_four"></div>

        <div className="tag">
          <p><span>{price}</span></p>
        </div>

        <div className="curve_one"></div>
        <div className="curve_two"></div>
      </div>
    </div>
  );
};

export default Card;
