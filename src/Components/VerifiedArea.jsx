import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const VerifiedArea = () => {
  const navigate = useNavigate();
  const handleAnotherProduct = () => {
    navigate("/");
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="my-md-4 my-1 d-flex align-items-center justify-content-center">
          <img
            src={require("../assets/yes.png")}
            className="verifyImg img-fluid"
            alt="authentic"
          />
          <h2 className="text-success authenticText my-2 ms-lg-2 ms-0">
            <b>AUTHENTIC</b>
          </h2>
        </div>
        <div className="row">
          <div className="col-4 text-end">
            <img
              src={require("../assets/3.png")}
              className="img-fluid verifiyImage"
              alt="product image"
            />
          </div>
          <div className="col-md-7 col-8 ms-lg-4 ms-0 textArea">
            <div>
              <b>Batch:</b> BDYAMP1
            </div>
            <div>
              <b>Name:</b> Blueberry Dum dum’s
            </div>
            <div className="my-4">
              <b>Activated:</b> May 01, 2023 11:21:49 GMT-0900 (Alaska Standard
              Time)
            </div>
            <div className="my-4">
              <b>Size:</b> 1 Gram
            </div>
            <div>
              <b>Description:</b> A sweet-berry mix with an earthy finish,
              Blueberry Dum Dum’s packs a hard-candy punch. This hybrid cross
              delivers a well-balanced body and head high that's perfect for
              getting through a busy day.
            </div>
          </div>
          <button
            onClick={() => handleAnotherProduct()}
            type="submit"
            className=" mx-auto rounded-pill anotherbutton "
          >
            <b>Check Another Product</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedArea;
