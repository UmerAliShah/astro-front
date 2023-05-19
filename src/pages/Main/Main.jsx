import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ToolArea from "../../Components/ToolArea";
import HeaderLogo from "../../assets/mainPageLogo.png";

const Main = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="background d-flex justify-content-sm-center justify-content-start  align-items-center flex-column toolArea">
      <Header
        headerLogo={HeaderLogo}
        backgroundColor="#f9b656"
        page="mainPage"
      />
      <div className="container-fluid py-xl-5 py-md-2 py-1">
        <div
          className={`row mainArea m-auto bg-white py-xl-5 py-md-3 py-1 ${
            isMobileScreen ? "" : "w-75"
          }`}
          style={{ borderRadius: "3.4rem" }}
        >
          <div className="col-12 my-auto">
            <ToolArea />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
