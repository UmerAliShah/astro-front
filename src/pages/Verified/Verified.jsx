import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import VerifiedArea from "../../Components/VerifiedArea";

const verified = () => {
  return (
    <div
      className="background d-flex justify-content-center align-items-center flex-column verifyArea"
    >
      <Header backgroundColor="#2e9f39" page="verifiedPage" />
      <div className="container-fluid">
        <div
          className="row m-auto bg-white w-75"
          style={{ borderRadius: "3.4rem" }}
        >
          <div className=" col-12 ">
            <VerifiedArea />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default verified;
