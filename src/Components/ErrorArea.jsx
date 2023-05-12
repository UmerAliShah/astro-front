import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const ErrorArea = () => {
  const navigate = useNavigate();
  const handleAnotherProduct = () => {
    navigate("/");
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="py-2 my-1 text-center">
          <img
            src={require("../assets/no.png")}
            className="img-fluid  errorImage"
            alt="authentic"
          />
        </div>
      </div>
      <div className="text-center my-4">
        <div className="errorText">
          <b>THE CODE YOU ENTERED DOES NOT MATCH THE ONES IN OUR SYSTEM!</b>
        </div>
        <div className="errorText mt-5">
          <b>WE DO NOT RECOMMEND USING THIS PRODUCT</b>
        </div>
        <button
          onClick={() => handleAnotherProduct()}
          type="submit"
          className="rounded-pill anotherbutton errorAnotherButton"
        >
          <b>Check Another Product</b>
        </button>
      </div>
    </div>
  );
};

export default ErrorArea;
