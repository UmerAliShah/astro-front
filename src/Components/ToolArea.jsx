import { useState } from "react";
import ProductArea from "./ProductArea";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const ToolArea = () => {
  const [verify, setVerify] = useState();
  const navigate = useNavigate();
  const { request, loading, error } = useApi((data) =>
    apiClient.post("/codes/verify", { key: data })
  );
  const handleverify = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(
      "Verifying product. This process may take a few minutes.",
      {
        autoClose: false,
        hideProgressBar: true,
      }
    );
    const result = await request(verify);
    if (result.status === 200) {
      toast.dismiss(loadingToast);
      navigate("/verified", {
        state: { product: verify },
      });
      toast.success("Product Verified", {
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else if (result.status === 400) {
      toast.error(result?.data?.error);
      toast.dismiss(loadingToast);
      navigate("/already-used");
    } else if (result.status === 404) {
      toast.error(result?.data?.error);
      toast.dismiss(loadingToast);
      navigate("/error");
    } else {
      toast.dismiss(loadingToast);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="row" style={{ overflowY: "hidden" }}>
      <div className="col-12">
        <h4
          className="text-dark text-center mt-md-0 mt-4 top-heading"
          style={{ fontWeight: "bold", letterSpacing: "-1px" }}
        >
          Please enter the 6 digit scratch off code to verify this product
        </h4>
        <form onSubmit={handleverify} className="text-center">
          <div className="pt-xl-5 pt-md-2 pt-1 verificationText">
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
            <input
              className=" my-2 p-4 form-control text-center   mx-auto "
              id="verificationCode"
              type="text"
              value={verify}
              maxLength={6}
              placeholder="aBc2GP"
              onChange={(e) => setVerify(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mx-auto rounded-pill px-lg-5 px-4 py-3 border-0 verify-btn"
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
      <ProductArea />
    </div>
  );
};

export default ToolArea;
