import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import { Table } from "react-bootstrap";

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
                <Table variant="light" striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>image</th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Description</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products?.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={data?.image}
                              class="img-fluid mx-auto my-2 verifyImg"
                              alt="iPhone"
                            />
                          </td>
                          <td className="my-auto">{data?.name}</td>
                          <td>{data?.size}</td>
                          <td>{data?.description}</td>
                          <td>
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
                          </td>
                          <td>
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
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Products;
