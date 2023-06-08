import { useEffect, useState } from "react";
import * as XLSX from "xlsx/xlsx";
import VerificationCodesTable from "./CodeTable";
import useApi from "../hooks/useApi";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const QRarea = () => {
  const [batchID, setBatchID] = useState("");
  const [range, setRange] = useState("");
  const [postfix, setPostfix] = useState("");
  console.log(postfix, "postfix");
  const [keyLength, setKeyLength] = useState(4);
  const [chracterSet, setChracterSet] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"
  );
  const [keys, setKeys] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCode, setLoadingCode] = useState(false);

  const isFormValid = range && keyLength && chracterSet && batchID && postfix;
  function generateVerificationCodes() {
    setLoadingCode(true);
    const flavour = postfix.toUpperCase();
    let newKeys = [];

    for (let i = 0; i < range; i++) {
      const prefix = generateRandomString(keyLength);
      const key = prefix + flavour;
      newKeys.push(key);
    }

    const uniqueKeys = [...new Set([...keys, ...newKeys])];
    setKeys(uniqueKeys);
    setLoadingCode(false);
  }
  const fetchProducts = async () => {
    const res = await apiClient.get("/product");
    if (res.status === 200) {
      setProducts(res.data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const generateRandomString = (length) => {
    const characters = chracterSet;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  const exportCodes = () => {
    const data = [["Index", "Verification Code", "Batch ID"]];
    keys?.forEach((code, index) => {
      const rowData = [index + 1, code, batchID];
      data.push(rowData);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Verification Codes");
    XLSX.writeFile(wb, "verification_codes.xlsx");
  };

  const { request, loading, error } = useApi((data) =>
    apiClient.post("/codes", data)
  );

  const saveKeys = async () => {
    const loadingToast = toast.loading(
      "Uploading Keys. This process may take a few minutes.",
      {
        autoClose: false,
        hideProgressBar: true,
      }
    );
    const data = {
      batchId: batchID,
      keys,
      postfix,
    };
    const result = await request(data);
    if (result.status === 200) {
      setKeys([]);
      setPostfix("");
      setRange("");
      setBatchID("");
      toast.dismiss(loadingToast);
      toast.success("Keys Submitted", {
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else if (result.status == 300) {
      toast.dismiss(loadingToast);
      toast.error(result.data.error);
    } else if (result.status == 400) {
      toast.dismiss(loadingToast);
      toast.error(result.data.error);
    } else {
      toast.dismiss(loadingToast);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="row">
          <h2 className="text-center fs-1 mb-3">
            <b> Key Generator </b>
          </h2>
          <div className="col">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-12 mb-4">
                  <div className="form-outline">
                    <label class="form-label" for="form6Example1">
                      <b>No of codes</b>
                    </label>
                    <input
                      required
                      type="number"
                      max={5000}
                      value={range}
                      onChange={(e) => {
                        setRange(e.target.value);
                        setKeys([]);
                      }}
                      id="form6Example1"
                      class="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="form-outline">
                    <label class="form-label" for="form6Example1">
                      <b>Single code length</b>
                    </label>
                    <input
                      required
                      type="number"
                      max={4}
                      value={keyLength}
                      onChange={(e) => {
                        setKeyLength(e.target.value);
                        setKeys([]);
                      }}
                      class="form-control"
                      id="form6Example7"
                    />
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="form-outline">
                    <label class="form-label" for="form6Example1">
                      <b>Chracter set</b>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={chracterSet}
                      value={chracterSet}
                      onChange={(e) => {
                        setChracterSet(e.target.value);
                        setKeys([]);
                      }}
                      class="form-control"
                      id="form6Example7"
                    />
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="form-outline">
                    <label class="form-label" for="form6Example1">
                      <b>Batch id</b>
                    </label>
                    <input
                      required
                      type="text"
                      value={batchID}
                      onChange={(e) => {
                        setBatchID(e.target.value);
                        setKeys([]);
                      }}
                      class="form-control"
                      id="form6Example7"
                    />
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="form-outline">
                    <label class="form-label" for="form6Example7">
                      <b>Product Name</b>
                    </label>
                    <select
                      required
                      name=""
                      id=""
                      className="form-control"
                      onChange={(e) => {
                        setPostfix(e.target.value.toUpperCase());
                        setKeys([]);
                      }}
                    >
                      <option value="">Select Product</option>
                      {products?.map((data) => {
                        return <option value={data.code}>{data.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center">
                {loadingCode && (
                  <span class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </span>
                )}
              </div>
              {!keys.length && (
                <button
                  onClick={generateVerificationCodes}
                  disabled={!isFormValid || loadingCode}
                  type="button"
                  className="btn btn-light text-primary ms-2 border border-1 py-4 px-4"
                >
                  <b>Generate code</b>
                </button>
              )}
            </form>
          </div>

          {keys?.length ? (
            <>
              <div className="row">
                <h2 className="text-black text-center mb-5">
                  <b>Generated codes</b>
                </h2>
                <div className="col-6 text-end">
                  <button
                    onClick={() => exportCodes()}
                    className="btn btn-light border border-1 py-3 px-4 text-primary"
                  >
                    <b> Export to excel</b>
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={() => saveKeys()}
                    className="btn btn-light border border-1 py-3 px-4 mb-3 text-primary"
                  >
                    <b> Save in DataBase</b>
                  </button>
                </div>
                <div
                  className="col-12"
                  style={{ overflowY: "scroll", height: "300px" }}
                >
                  <VerificationCodesTable codes={keys} batchID={batchID} />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default QRarea;
