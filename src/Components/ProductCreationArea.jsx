import { useState } from "react";
import { toast } from "react-toastify";
import useApi from "../hooks/useApi";
import apiClient from "../api/apiClient";
import BackgroundImg from "../assets/background-toolarea.png";

const CreateProduct = () => {
  const initialState = {
    name: "",
    size: "",
    description: "",
    image: "",
  };
  const [data, setData] = useState(initialState);
  console.log(data, "data");
  const handleChange = (key, value) => {
    if (key === "image") {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data?.name);
    formdata.append("size", data?.size);
    formdata.append("description", data?.description);
    formdata.append("image", data?.image);
    const result = await request(formdata);
    console.log(result, "res");
    const loadingToast = toast.loading(
      "Uploading product. This process may take a few minutes.",
      {
        autoClose: false,
        hideProgressBar: true,
      }
    );
    if (result.status === 200) {
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
    <div className="container-fluid">
      <div className="row">
        <h2 className="text-center fs-1 my-4 mb-5">Add a new product</h2>
        <div className="col" style={styles}>
          <form onSubmit={handleSubmit}>
            <div class="row">
              <div class="col">
                <div class="form-outline">
                  <input
                    value={data?.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    type="text"
                    id="form6Example1"
                    class="form-control"
                  />
                  <label class="form-label" for="form6Example1">
                    Product Name
                  </label>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input
                    value={data?.size}
                    onChange={(e) => handleChange("size", e.target.value)}
                    type="text"
                    id="form6Example2"
                    class="form-control"
                  />
                  <label class="form-label" for="form6Example2">
                    Product Size
                  </label>
                </div>
              </div>
              <div class="form-outline mb-4">
                <textarea
                  value={data?.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  class="form-control"
                  id="form6Example7"
                  rows="4"
                ></textarea>
                <label class="form-label" for="form6Example7">
                  Product Description
                </label>
              </div>
              <div>
                <div class="d-flex justify-content-center mb-4">
                  <div class="verifyButton  rounded-pill px-4">
                    <label class="form-label text-dark my-1" for="customFile1">
                      Choose file
                    </label>
                    <input
                      onChange={(e) => handleChange("image", e.target.files)}
                      type="file"
                      class="form-control d-none"
                      id="customFile1"
                    />
                  </div>
                  <label htmlFor="customFile1" className="mx-2 my-auto">
                    Add product image
                  </label>
                </div>
              </div>
            </div>
            <div className="justify-content-center d-flex">
              <button
                type="submit"
                class="verifyButton btn-block mb-4 rounded-pill px-4"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
