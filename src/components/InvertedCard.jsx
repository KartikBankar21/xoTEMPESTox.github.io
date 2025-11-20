import React from "react";
import "./InvertedCard.css";

const InvertedCard = ({ 
  brand = "Nike", 
  image, 
  title = "Air Max Dia", 
  price = "$149.00", 
  colors = ["#e75a7c", "#4ecdc4", "#fffffc", "#2c363f"] 
}) => {
  return (
    <div className="container">
      <div className="title">{brand}</div>

      <div className="card">
        <img src={image} alt={title} />
      </div>

      <div className="product-card">
        <h2>{title}</h2>
        <p className="price">{price}</p>

        <div className="actions">
          <span className="cart-icon">🛒</span>
          
          <button className="buy-now">Buy Now</button>

          <div className="options">
            {colors.map((color, index) => (
              <span
                key={index}
                className="color"
                style={{ background: color }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvertedCard;
