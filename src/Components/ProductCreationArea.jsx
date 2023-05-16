import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../hooks/useApi";
import apiClient from "../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setData(state?.product);
  }, [state]);
  const initialState = {
    name: "",
    size: "",
    code: "",
    description: "",
    image: "",
  };
  const [data, setData] = useState(initialState);
  const [preview, setPreview] = useState();
  const handleChange = (key, value) => {
    if (key === "image") {
      setPreview(value[0]);
      const reader = new FileReader();
      reader.readAsDataURL(value[0]);
      reader.onloadend = () => {
        const base64data = reader.result;
        const blob = dataURItoBlob(base64data);
        setData({ ...data, image: blob });
      };
    } else {
      setData({ ...data, [key]: value });
    }
  };
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };
  const { request, loading, error } = useApi((formData) =>
    apiClient.post("/product", formData)
  );
  const updateProduct = useApi((formData) =>
    apiClient.put(`/product/${state?.product?._id}`, formData)
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(
      "Uploading product. This process may take a few minutes.",
      {
        autoClose: false,
        hideProgressBar: true,
      }
    );
    const formdata = new FormData();
    formdata.append("name", data?.name);
    formdata.append("size", data?.size);
    formdata.append("code", data?.code);
    formdata.append("description", data?.description);
    formdata.append("image", data?.image);
    const result = await request(formdata);
    if (result.status === 200) {
      setData(initialState);
      toast.dismiss(loadingToast);
      toast.success("Product Submitted", {
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else if (result.status === 403) {
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
  const handleupdateProduct = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data?.name);
    formdata.append("size", data?.size);
    formdata.append("code", data?.code);
    formdata.append("description", data?.description);
    formdata.append("image", data?.image);
    const result = await updateProduct.request(formdata);
    const loadingToast = toast.loading(
      "Uploading product. This process may take a few minutes.",
      {
        autoClose: false,
        hideProgressBar: true,
      }
    );
    if (result.status === 200) {
      navigate("/all-products");
      setData(initialState);
      toast.dismiss(loadingToast);
      toast.success("Product Submitted", {
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else {
      toast.dismiss(loadingToast);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
  };
  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center fs-1 mb-3">
          <b>{state ? "Update product" : "Add a new product"}</b>
        </h2>
        <div className="col" style={styles}>
          <form onSubmit={state ? handleupdateProduct : handleSubmit}>
            <div class="row">
              <div class="col-12 mb-4">
                <div class="form-outline">
                  <label class="form-label" for="form6Example1">
                    <b> Product Name</b>
                  </label>
                  <input
                    required
                    value={data?.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    type="text"
                    id="form6Example1"
                    class="form-control "
                  />
                </div>
              </div>
              <div class="col-12 mb-4">
                <div class="form-outline">
                  <label class="form-label" for="form6Example2">
                    <b> Product Size </b>
                  </label>
                  <input
                    required
                    value={data?.size}
                    onChange={(e) => handleChange("size", e.target.value)}
                    type="text"
                    id="form6Example2"
                    class="form-control "
                  />
                </div>
              </div>
              <div class="col-12 mb-4">
                <div class="form-outline">
                  <label class="form-label" for="form6Example2">
                    <b> Product Postfix</b>
                  </label>
                  <input
                    required
                    value={data?.code}
                    onChange={(e) => handleChange("code", e.target.value)}
                    type="text"
                    id="form6Example2"
                    class="form-control "
                  />
                </div>
              </div>
              <div class="form-outline mb-4">
                <label class="form-label" for="form6Example7">
                  <b> Product Description</b>
                </label>
                <textarea
                  required
                  value={data?.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  class="form-control"
                  id="form6Example7"
                ></textarea>
              </div>
              <div>
                {preview || data?.image ? (
                  <div class="col-md-12 col-lg-4 mb-4 ">
                    <div class="card text-black bg-transparent">
                      {state ? (
                        <img
                          src={data?.image}
                          class="card-img-top img-fluid w-25 mx-auto my-2"
                        />
                      ) : (
                        <img
                          src={preview && URL.createObjectURL(preview)}
                          class="card-img-top img-fluid w-25 mx-auto my-2"
                        />
                      )}
                    </div>
                  </div>
                ) : null}
                <div class="row mb-4">
                  <label htmlFor="customFile1" className="mx-2 my-auto mb-2">
                    <b>
                      {state ? "Update Product image" : "Add product image"}
                    </b>
                  </label>
                  <small style={{fontSize:"12px"}}>180px x 640px is recommanded </small>
                  <div className="col-6">
                    <div class="btn btn-primary  px-4">
                      <label
                        class="form-label text-white my-1"
                        for="customFile1"
                      >
                        <b> Upload Image</b>
                      </label>
                      <input
                        onChange={(e) => handleChange("image", e.target.files)}
                        type="file"
                        class="form-control d-none"
                        id="customFile1"
                      />
                    </div>
                    <button
                      disabled={loading}
                      type="submit"
                      class="btn btn-light text-primary ms-2 border border-1 py-4 px-4"
                    >
                      <b> {state ? "Update Product" : "Save Product"} </b>
                    </button>
                  </div>
                  <div className="col-6 text-end">
                    <button
                      type="button"
                      onClick={() => setData(initialState)}
                      className="btn btn-light text-primary  py-4 px-4"
                    >
                      <b>clear </b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
