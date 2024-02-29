import React from "react";
import "./main.css";
import close from "../Assets/close.png";

const PopupContent = ({ data, onClose }) => {
  const renderBulletPoints = (list) => {
    if (!list) return null;
    return (
      <div className="items-consumed-list">
        {list.split(",").map((item, index) => (
          <p key={index}>{item.trim()}</p>
        ))}
      </div>
    );
  };

  const renderPercentageSales = () => {
    const salesData = data["Percentage sales of probable products"];
    if (!salesData) return null; // Handle case where salesData is undefined or null
    const salesArray = salesData.split("\n").slice(1, -1);

    return (
      <div >
        <div class="tbl-header">
          <table
            className="sales-table"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            <thead>
              <tr>
                <th>Product</th>
                <th>Percentage Sales</th>
              </tr>
            </thead>
          </table>
        </div>

        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              {salesArray.map((line, index) => {
                const [product, percentage] = line.split(/\s{2,}/);
                return (
                  <tr key={index}>
                    <td>{product}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
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
            <div className="popup-customer-name">
              <h2>{data.cust_name}</h2>
            </div>
            <div className="item-consumed-container">
              <p>
                <h3>Items Consumed:</h3>
                {renderBulletPoints(data.Items_Consumed)}
              </p>
            </div>
            <div className="precentage-sales-container">
              {/* <h3>Sales Probability:</h3> */}
              <div className="sales-grid">{renderPercentageSales()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupContent;
