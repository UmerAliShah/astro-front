import { useState } from "react";
import Footer from "./Footer";
import ProductArea from "./ProductArea";
import { useNavigate } from "react-router-dom";

const ToolArea = () => {
  const [verify, setVerify] = useState();
  const navigate = useNavigate();
  const handleverify = () => {
    navigate("/verified");
  };

  return (
    <div className="row">
      <div className="col-12">
        <h4 className="text-dark topHeading text-center">
          <b>
            Please enter the 6 digit scratch off code to verify this product
          </b>
        </h4>
        <form className="text-center">
          <div>
            <label className="form-label verificationCode" htmlFor="verificationCode">
              <b> VERIFICATION CODE</b>
            </label>
            <input
              className="inputField my-2  form-control text-center  mx-auto rounded-pill"
              id="verificationCode"
              type="text"
              value={verify}
              maxLength={6}
              disabled={verify?.length >= 6}
              placeholder="aBc2GP"
              onChange={(e) => setVerify(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleverify()}
            type="submit"
            className="mx-auto rounded-pill verifyButton"
          >
            <b>VERIFY</b>
          </button>
        </form>
        <hr
          className="bg-dark text-dark mx-auto"
          style={{ height: "2px", width: "95%" }}
        />
      </div>
      <ProductArea />
    </div>
  );
};

export default ToolArea;
