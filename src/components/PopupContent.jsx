import React from "react";
import "./main.css";
import close from "../Assets/close.png";

const PopupContent = ({ description, onClose, data }) => {
  const renderBulletPoints = (list) => {
    return (
      <ul>
        {list.split(",").map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="popup-content">
      <div className="popup-close" onClick={onClose}>
        <img src={close} alt="" />
      </div>
      <div className="popup-centent-container">
        <div className="popup-description">
          <div>
            <h3>Name: {data.cust_name}</h3>
            {/* <p>
              Location: {data.latitude}, {data.longitude}
            </p> */}
            <p>
              <h3>Items Consumed:</h3>

              <ul> {renderBulletPoints(data.Items_Consumed)}</ul>
            </p>
            <p>
              <h3>Items Not Consumed:</h3>

              <ul>{renderBulletPoints(data.Items_Not_Consumed)}</ul>
            </p>
            <p>
              <h3>Statistics:</h3>

              <ul>{data.Statistics}</ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupContent;
