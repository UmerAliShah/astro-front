import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await apiClient.get("/product");
    if (res.status === 200) {
      setProducts(res.data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (data) => {
    const result = await apiClient.delete(`/product/${data?._id}`);
    if (result?.status === 200) {
      toast.success("Product deleted successfully!");
      setProducts(result.data);
    } else {
      toast.error("something went wrong!");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <section style={{ backgroundColor: " #eee" }}>
            <div class="container py-5">
              <div class="row">
                {products?.map((data, index) => {
                  return (
                    <div class="col-md-12 col-lg-4 mb-4 ">
                      <div class="card text-black bg-transparent">
                        <img
                          src={data?.image}
                          class="card-img-top img-fluid w-25 mx-auto my-2"
                          alt="iPhone"
                        />
                        <div class="card-body">
                          <div class="text-center mt-1">
                            <h4 class="card-title">{data?.name}</h4>
                            <h6 class="text-primary mb-1 pb-3">{data?.size}</h6>
                          </div>

                          <div class="d-flex flex-row">
                            <button
                              type="button"
                              class="btn btn-primary flex-fill me-1"
                              data-mdb-ripple-color="dark"
                              onClick={() => {
                                navigate("/createProduct", {
                                  state: { product: data },
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              class="btn btn-danger flex-fill ms-1"
                              onClick={() => handleDelete(data)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Products;
