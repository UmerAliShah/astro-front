import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ToolArea from "../../Components/ToolArea";
import HeaderLogo from "../../assets/mainPageLogo.png";

const Main = () => {
  const isMobileScreen = window.innerWidth <= 426;
  return (
    <>
      <Header
        headerLogo={HeaderLogo}
        backgroundColor="#f9b656"
        page="mainPage"
      />
      <div className="  background  toolArea">
        <div className="container-fluid ">
          <div className="pt-xl-5 pt-2 d-flex  justify-content-center  align-items-center flex-column">
            <div
              className={`row mainArea m-auto bg-white py-4 ${
                isMobileScreen ? "w-100" : "w-75"
              }`}
              style={{ borderRadius: "3.4rem" }}
            >
              <div className="col-12">
                <ToolArea />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
