import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import VerifiedArea from "../../Components/VerifiedArea";
import BackgroundImage from "../../assets/verify-background.png";

const Verified = () => {
  const isMobileScreen = window.innerWidth < 600;

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
      <Header backgroundColor="#2e9f39" page="verifiedPage" />
      <div
        className={`flex-grow-1 d-flex justify-content-center align-items-sm-center align-items-start pt-sm-0  ${
          isMobileScreen ? "bg-white" : ""
        }`}
      >
        <div
          className=" p-xl-3 px-md-3 px-0 py-1 bg-white verifiedAreaMain"
          style={{ width: "80%", maxWidth: "100%", borderRadius:"4rem" }}
        >
          <VerifiedArea isMobileScreen={isMobileScreen}/>
        </div>
      </div>
      <Footer />
    </div>
  );
  // return (
  //   <div
  //     className="background d-flex justify-content-center align-items-center flex-column verifyArea"
  //   >
  //     <Header backgroundColor="#2e9f39" page="verifiedPage" />
  //     <div className="container-fluid">
  //       <div
  //         className="row m-auto bg-white w-75"
  //         style={{ borderRadius: "3.4rem" }}
  //       >
  //         <div className=" col-12 ">
  //           <VerifiedArea />
  //         </div>
  //         <Footer />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Verified;
