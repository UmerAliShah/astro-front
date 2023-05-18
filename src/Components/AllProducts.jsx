import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentProduct, seCurrentProduct] = useState();

  const fetchProducts = async () => {
    setLoading(true);
    const res = await apiClient.get("/product");
    if (res.status === 200) {
      setLoading(false);
      setProducts(res.data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    console.log(currentProduct, "workkkkkkkkk");
    const result = await apiClient.delete(
      `/product/${currentProduct && currentProduct?._id}`
    );
    if (result?.status === 200) {
      toast.success("Product deleted successfully!");
      fetchProducts();
      setModal(false);
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <section>
            <div class="container py-5">
              <div class="row">
                {loading && (
                  <div className="d-flex align-items-center justify-content-center">
                    <span class="spinner-border" role="status">
                      <span class="sr-only"></span>
                    </span>
                  </div>
                )}
                <Modal
                  show={modal}
                  onHide={() => setModal(false)}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header className="text-white main_bg " closeButton>
                    <Modal.Title
                      className="text-primary text-center w-100 fw-bold fs_20px"
                      id="contained-modal-title-vcenter"
                    >
                      Are you sure you want to delete
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="text-center">
                      <button
                        className="btn mx-2 btn-danger"
                        onClick={() => handleDelete()}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => setModal(false)}
                      >
                        No
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
                {products &&
                  products?.map((data, index) => {
                    return (
                      <div class="col-md-12 col-lg-4 mb-4 ">
                        <div class="card text-black bg-white">
                          <img
                            src={data?.image}
                            class="card-img-top img-fluid w-25 mx-auto my-2"
                            alt="iPhone"
                          />
                          <div class="card-body">
                            <div class="text-center mt-1">
                              <h4 class="card-title">{data?.name}</h4>
                              <h6 class="text-primary mb-1 pb-3">
                                {data?.size}
                              </h6>
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
                                onClick={() => {
                                  setModal(true);
                                  seCurrentProduct(data);
                                }}
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
