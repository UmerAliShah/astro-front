import Header from "../../Components/Header";
import ErrorArea from "../../Components/ErrorArea";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import BackgroundImage from "../../assets/error-background.png";

const Error = () => {
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
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header backgroundColor="#e8484c" page="mainPage" />
      <div
        className={`flex-grow-1 d-flex justify-content-center  align-items-sm-center align-items-start ${
          isMobileScreen ? "bg-white" : ""
        }`}
      >
        <div
          className="p-xl-5 px-md-3 px-0 py-sm-3 py-0 bg-white rounded-4"
          style={{
            width: `${isMobileScreen ? "90%" : "80%"}`,
            maxWidth: "100%",
          }}
        >
          <ErrorArea />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
