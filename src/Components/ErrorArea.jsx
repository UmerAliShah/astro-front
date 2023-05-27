import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const ErrorArea = () => {
  const navigate = useNavigate();
  const handleAnotherProduct = () => {
    navigate("/");
  };
  const isMobileScreen = window.innerWidth < 575;
  return (
    <div className="row" style={{ overflow: "hidden" }}>
      <div className="col-12">
        <div className="py-2 mt-xl-5 mb-2 text-center">
          <img
            src={require("../assets/no.png")}
            className="img-fluid errorImage"
            alt="authentic"
          />
        </div>
      </div>
      <div className={`text-center my-xl-4 mb-5 py-sm-0 py-5 pb-4 `}>
        <div className="errorText">
          <b>THE CODE YOU ENTERED DOES NOT MATCH THE ONES IN OUR SYSTEM!</b>
        </div>
        <div
          className={`errorText mt-xl-5 pt-sm-0 pt-5 mt-1 mb-xl-5 ${
            isMobileScreen ? "" : "w-75"
          } mx-auto mb-2`}
        >
          <b>
            WE DO <u> NOT</u> RECOMMEND USING THIS PRODUCT
          </b>
        </div>
      </div>
      <button
        onClick={() => handleAnotherProduct()}
        type="submit"
        className="rounded-pill mt-xl-5 mt-5 mx-auto d-md-block d-none anotherbutton errorAnotherButton"
      >
        <b>Check Another Product</b>
      </button>
    </div>
  );
};

export default ErrorArea;
