import React, { useState } from "react";
import "./main.css";
import close from "../Assets/close.png";
import table from "../Assets/cells.png";
import grid from "../Assets/pixels.png";

const PopupContent = ({ data, onClose }) => {
  const [activeTab, setActiveTab] = useState("table");
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

  const renderPercentageSalesTable = () => {
    const salesData = data["Percentage sales of probable products"];
    if (!salesData) return null;
    const salesArray = salesData.split("\n").slice(1, -1);

    return (
      <div>
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

  const renderPercentageSalesDataView = () => {
    const salesData = data["Percentage sales of probable products"];
    if (!salesData) return null; // Handle case where salesData is undefined or null
    const salesArray = salesData.split("\n").slice(1, -1);

    // Pagination logic
    const totalPages = Math.ceil(salesArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, salesArray.length);
    const currentData = salesArray.slice(startIndex, endIndex);

    return (
      <>
        <div className="sales-data-view">
          {currentData.map((line, index) => {
            const [product, percentage] = line.split(/\s{2,}/);
            return (
              <div className="sales-item" key={index}>
                <p>{product}:</p>
                <h3>{percentage}%</h3>
              </div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <div className="data-view-pagination">
            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="page-count">{currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="popup-content">
      <div className="popup-centent-container">
        <div className="popup-description">
          <div>
            <div className="popup-header-container">
              <div className="popup-customer-name">
                <h2>{data.cust_name}</h2>
              </div>
              <div className="popup-close" onClick={onClose}>
                <img src={close} alt="" />
              </div>
            </div>
            <div className="item-consumed-container">
              <p>
                <h3>Items Consumed</h3>
                <div className="items-consumed-container-data">
                  {renderBulletPoints(data.Items_Consumed)}
                </div>
              </p>
            </div>
            {/* <div className="precentage-sales-container">
              <div className="sales-grid">{renderPercentageSales()}</div>
            </div> */}
            <div className="percentage-sales-container">
              <div className="tabs">
                <button
                  className={activeTab === "table" ? "active" : ""}
                  onClick={() => setActiveTab("table")}
                >
                  <div className="tab-button-text">
                    <img src={table} alt="" />
                    <p> Table View</p>
                  </div>
                </button>
                <button
                  className={activeTab === "data" ? "active" : ""}
                  onClick={() => setActiveTab("data")}
                >
                  <div className="tab-button-text">
                    <img src={grid} alt="" />
                    <p> Data View</p>
                  </div>
                </button>
              </div>
              <div className="sales-content">
                {activeTab === "table"
                  ? renderPercentageSalesTable()
                  : renderPercentageSalesDataView()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupContent;
