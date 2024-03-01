import "./main.css";
import Tibersoft from "../Assets/Tibersoft-Cultura-Logo-White.svg";
import cell from "../Assets/cell-planning.png";
import conagra from "../Assets/conagra.png";
import downArrow from "../Assets/down-arrow.png";
import getHelp from "../Assets/get-help.png";
import menuBar from "../Assets/menu-bar.png";
import performance from "../Assets/performance.png";
import ToolsLogo from "../Assets/Tools Logo.png";
import { useState } from "react";

export const HeaderComponent = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div className="header-main-div">
        <div className="logo-container">
          <img className="menubar-icon" src={menuBar} alt="" />
          <img className="tibersoft-logo" src={Tibersoft} alt="" />
        </div>
        <div className="header-tools">
          <img src={ToolsLogo} className="your-tools-icon" alt="" />
          <h1>YOUR TOOLS</h1>
        </div>

        <div className="nvaigation-items-container">
          <div className="navigation-item-list">
            <div className="Performance-div">
              <div className="nav-title">
                <img src={performance} alt="" />
                <p>Map View</p>
              </div>
              <div className="nav-dropdown-btn">
                {/* <img src={downArrow} alt="" /> */}
              </div>
            </div>

            {/* <div className="Performance-div">
            <div className="nav-title">
              <img src={cell} alt="" />
              <p>Call Planning</p>
            </div>
            <div className="nav-dropdown-btn">
              <img src={downArrow} alt="" />
            </div>
          </div> */}
          </div>

          {/* <div className="help-item-list">
          <div className="Performance-div">
            <div className="nav-title">
              <img src={getHelp} alt="" />
              <p>Get Help</p>
            </div>
            <div className="nav-dropdown-btn">
              <img src={downArrow} alt="" />
            </div>
          </div>

          <div className="Performance-div">
            <div className="nav-title">
              <img src={conagra} alt="" />
              <p>Conagra</p>
            </div>
            <div className="nav-dropdown-btn">
              <img src={downArrow} alt="" />
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};
