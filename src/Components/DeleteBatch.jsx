import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import apiClient from "../api/apiClient";
import * as XLSX from "xlsx/xlsx";
import { toast } from "react-toastify";

const DeleteBatch = () => {
  const [batches, setBatches] = useState([]);
  console.log(batches, "batches");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentBatch, seCurrentBatch] = useState();

  const fetchKeys = async (status) => {
    setLoading(true);
    const res = await apiClient.get(`/codes/batch`);
    if (res.status === 200) {
      setLoading(false);
      setBatches(res.data);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleDelete = async () => {
    console.log(currentBatch, "workkkkkkkkk");
    const result = await apiClient.delete(
      `/codes/batch/${currentBatch && currentBatch?._id}`
    );
    if (result?.status === 200) {
      toast.success("Batch deleted successfully!");
      fetchKeys();
      setModal(false);
    } else {
      toast.error("something went wrong!");
    }
  };

  const renderTableRows = () => {
    return batches.map((data, index) => {
      return (
        <tr key={data._id}>
          <td>{index + 1}</td>
          <td>{data.batchName}</td>
          <td>{data.totalKeys}</td>
          <td>{data.totalActivatedKeys}</td>
          <td>{data.totalInactivatedKeys}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger flex-fill ms-1"
              onClick={() => {
                setModal(true);
                seCurrentBatch(data);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div class="container-fluid my-5" style={{ overflowY: "scroll" }}>
      <div className="row text-center my-4">
        <h2 className="mx-auto">
          <b>Batches Detail</b>
        </h2>
      </div>
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
            <button className="btn btn-success" onClick={() => setModal(false)}>
              No
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div className="d-flex align-items-center justify-content-center">
          <span class="spinner-border" role="status">
            <span class="sr-only"></span>
          </span>
        </div>
      )}
      <Table variant="light" striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Batch Name</th>
            <th scope="col">Total Keys</th>
            <th scope="col">Activated Keys</th>
            <th scope="col">In Activated Keys</th>
            <th scope="col">Delete Batch</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
    </div>
  );
};
export default DeleteBatch;
