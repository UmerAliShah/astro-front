import { useState } from "react";
import Footer from "./Footer";
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
    <div className="row">
      <div className="col-12">
        <h4 className="text-dark topHeading text-center">
          <b>
            Please enter the 6 digit scratch off code to verify this product
          </b>
        </h4>
        <form onSubmit={handleverify} className="text-center">
          <div>
            <label
              className="form-label verificationCode"
              htmlFor="verificationCode"
            >
              <b> VERIFICATION CODE</b>
            </label>
            <input
              className="inputField my-2  form-control text-center  mx-auto rounded-pill"
              id="verificationCode"
              type="text"
              value={verify}
              maxLength={6}
              placeholder="aBc2GP"
              onChange={(e) => setVerify(e.target.value)}
            />
          </div>
          <button type="submit" className="mx-auto rounded-pill verifyButton">
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
