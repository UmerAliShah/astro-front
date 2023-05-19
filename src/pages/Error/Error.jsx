import Header from "../../Components/Header";
import ErrorArea from "../../Components/ErrorArea";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
const Error = () => {
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
    <div className="background errorArea d-flex justify-content-center  align-items-center flex-column">
      <Header backgroundColor="#e8484c" page="errorPage " />
      <div className="container-fluid">
        <div
          className={`bg-white m-auto row ${isMobileScreen ? "" : "w-75"}`}
          style={{ borderRadius: "3.4rem" }}
        >
          <div className="col-12">
            <ErrorArea />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Error;
