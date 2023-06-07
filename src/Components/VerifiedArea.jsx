import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VerifiedArea = () => {
  const { state } = useLocation();
  const [productData, setProductData] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [activatedDate, setActivatedDate] = useState();

  useEffect(() => {
    getSpecficProduct(state?.product);
  }, [state]);

  const navigate = useNavigate();
  const handleAnotherProduct = () => {
    setProductData([]);
    setActivatedDate([]);
    setBatchData([]);
    navigate("/");
  };
  const getSpecficProduct = async (productCode) => {
    const result = await apiClient.get(
      `/product/getVerifiedProduct/${productCode}`
    );
    if (result.status === 200) {
      const { product, batch } = result.data;
      setProductData(product);
      const date = new Date(batch?.createdAt);
      const formattedDate = date.toLocaleString();
      setActivatedDate(formattedDate);
      if (batch) {
        const { batchId } = batch;
        setBatchData(batchId?.BatchID);
      }
    }
  };
  return (
    <div className="row" style={{ overflow: "hidden" }}>
      <div className="col-12 ">
        <div className="py-xxl-5 py-xl-4 py-3 d-flex align-items-center justify-content-center flex-lg-row flex-column">
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
              src={productData?.image}
              className="img-fluid verifiedProduct"
              alt="product image"
            />
          </div>
          <div className="col-md-7 col-8 ms-lg-4 ms-0 textArea fs-6">
            <div>
              <b>Batch:</b>
              {` ${batchData || ""}`}
            </div>
            <div>
              <b>Name:</b>
              {` ${productData?.name || ""}`}
            </div>
            <div className="my-xl-4 my-2">
              <b>Activated:</b>
              {` ${activatedDate || ""}`}
            </div>
            <div className="my-xl-4 my-2">
              <b>Size:</b> {` ${productData?.size || ""}`}
            </div>
            <div>
              <b>Description:</b>
              {` ${productData?.description || ""}`}
            </div>
          </div>
          <button
            onClick={() => handleAnotherProduct()}
            type="submit"
            className="d-md-block mt-md-5 py-2 mt-1 d-none mx-auto rounded-pill anotherbutton "
          >
            <b>Check Another Product</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedArea;
