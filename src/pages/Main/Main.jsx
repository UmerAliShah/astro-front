import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ToolArea from "../../Components/ToolArea";
import HeaderLogo from "../../assets/mainPageLogo.png";
import BackgroundImage from "../../assets/main-background.png";

const Main = () => {
  const isMobileScreen = window.innerWidth < 575;
  useEffect(() => {
    if (!isMobileScreen) {
      document.body.style.backgroundImage = `url(${BackgroundImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    }
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);

  console.log(isMobileScreen, "is mobile");
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        headerLogo={HeaderLogo}
        backgroundColor="#f9b656"
        page="mainPage"
      />
      <div
        className={`flex-grow-1 d-flex justify-content-center align-items-sm-center align-items-start pt-sm-0 pt-2 ${
          isMobileScreen ? "bg-white" : ""
        }`}
      >
        <div
          className="p-xxl-5 p-xl-4  px-md-3 px-0 py-3 bg-white toolArea-1"
          style={{
            width: "80%",
            maxWidth: "100%",
            borderRadius: "4rem",
          }}
        >
          <ToolArea />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
