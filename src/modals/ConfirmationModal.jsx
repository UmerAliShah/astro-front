import Modal from "react-bootstrap/Modal";

const ConfirmationModal = async ({
  onHide,
  show,
//   handleDelete,
//   fetchProducts,
}) => {
  const handleYes = () => {
    // handleDelete();
    // fetchProducts();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="text-white main_bg " closeButton>
        <Modal.Title
          className="text-white text-center w-100 fw-bold fs_20px"
          id="contained-modal-title-vcenter"
        >
          Are you sure you want to delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button onClick={() => handleYes()}>Yes</button>
        <button>No</button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
