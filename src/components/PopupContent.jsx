import React, { useState } from "react";
import "./main.css";
import close from "../Assets/close.png";

const PopupContent = ({ data, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    const totalPages = Math.ceil(salesArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, salesArray.length);

    return salesArray
      .slice(startIndex, endIndex)
      .map((line, index) => {
        const [product, percentage] = line.split(/\s{2,}/);
        return (
          <div className="sales-item" key={index}>
            <p>
              {product}: 
            </p>
            <h3>{percentage}%</h3>
          </div>
        );
      });
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data["Percentage sales of probable products"].split("\n").slice(1, -1).length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
              <h3>Sales Probability:</h3>
              <div className="sales-grid">
                {renderPercentageSales()}
              </div>
              <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <span className="page-count">{currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(data["Percentage sales of probable products"].split("\n").slice(1, -1).length / itemsPerPage)}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupContent;
