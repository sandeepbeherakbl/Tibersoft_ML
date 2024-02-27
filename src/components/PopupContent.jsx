import React from "react";
import "./main.css";
import close from "../Assets/close.png";

const PopupContent = ({ data, onClose }) => {
  const renderBulletPoints = (list) => {
    if (!list) return null;
    return (
      <ul>
        {list.split(",").map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  const renderPercentageSales = (salesData) => {
    return salesData
      .split("\n")
      .slice(1, -1)
      .map((line, index) => {
        const [product, percentage] = line.split(/\s{2,}/);
        return (
          <li key={index}>
            {product}: {percentage}%
          </li>
        );
      });
  };

  return (
    <div className="popup-content">
      <div className="popup-close" onClick={onClose}>
        <img src={close} alt="" />
      </div>
      <div className="popup-centent-container">
        <div className="popup-description">
          <div>
            <div className="popup-customer-name">
              <h3>Name: {data.cust_name}</h3>
            </div>
            <div className="item-consumed-container">
                <p>
                  <h3>Items Consumed:</h3>
                  {renderBulletPoints(data.Items_Consumed)}
                </p>
              </div>
            <div className="precentage-sales-container">
              <h3>Percentage Sales:</h3>
              <ul>{renderPercentageSales(data["Percentage sales of probable products"])}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupContent;
