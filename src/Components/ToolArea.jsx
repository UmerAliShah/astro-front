import { useState } from "react";
import ProductArea from "./ProductArea";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import apiClient from "../api/apiClient";

const ToolArea = () => {
  const [verify, setVerify] = useState();
  const [fieldError, setFieldError] = useState(false);
  const navigate = useNavigate();
  const { request, loading, error } = useApi((data) =>
    apiClient.post("/codes/verify", { key: data })
  );
  const handleverify = async (e) => {
    e.preventDefault();

    if (!verify) {
      setFieldError(true);
    } else {
      const result = await request(verify);
      if (result.status === 200) {
        navigate("/verified", {
          state: { product: verify },
        });
      } else if (result.status === 400) {
        navigate("/already-used");
      } else if (result.status === 404) {
        navigate("/error");
      }
    }
  };

  return (
    <div className="row" style={{ overflow: "hidden" }}>
      <div className="col-12">
        <h4
          className="text-dark pt-xxl-2 pt-0 text-center mt-md-0 mt-sm-4 mt-0 top-heading"
          style={{ fontWeight: "bold", letterSpacing: "-1px" }}
        >
          Please enter the 6 digit scratch off code to verify this product
        </h4>
        <form onSubmit={handleverify} className="text-center">
          <div className="pt-xxl-4 pt-xl-3 pt-1 py-0 my-0 verificationText">
            <label
              className="form-label "
              htmlFor="verificationCode"
              style={{
                color: "black",
                letterSpacing: "-1px",
                fontWeight: "bold",
              }}
            >
              VERIFICATION CODE
            </label>
            <div className="position-relative">
              <input
                className={` p-4 form-control text-center   mx-auto  ${
                  fieldError && "border border-danger "
                }`}
                id="verificationCode"
                type="text"
                value={verify}
                maxLength={6}
                placeholder={fieldError ? "This field is required" : "aBc2GP"}
                onChange={(e) => setVerify(e.target.value)}
              />
              {fieldError && (
                <div className="errorField" >
                  <i class="bi bi-x-circle-fill fs-4 text-danger me-3"></i>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto mt-4 rounded-pill px-lg-5 px-5 py-3 border-0 verify-btn"
            style={{ background: "rgb(249, 182, 86)", letterSpacing: "-1px" }}
          >
            <b>VERIFY</b>
          </button>
        </form>
        <hr
          className="bg-dark text-dark mx-auto d-md-block d-none"
          style={{ height: "2px", width: "95%" }}
        />
      </div>
      <div className="col-12" style={{ overflow: "auto" }}>
        <ProductArea />
      </div>
    </div>
  );
};

export default ToolArea;
