import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const AlreadyUsed = () => {
  const navigate = useNavigate();
  const handleAnotherProduct = () => {
    navigate("/");
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="py-2 my-1 text-center">
          <img
            src={require("../assets/limitation.png")}
            className="img-fluid  errorImage"
            alt="authentic"
          />
        </div>
      </div>
      <div className="text-center my-4">
        <div className="errorText">
          <b>HIS CODE HAS PREVIOUSLY BEEN VERIFIED!</b>
        </div>
        <div className="errorText mt-5">
          <b>
            WE CANNOT VERIFY THIS PRODUCT. THIS PRODUCT MIGHT NOT BE AUTHENTIC
          </b>
        </div>
        <button
          onClick={() => handleAnotherProduct()}
          type="submit"
          className="rounded-pill anotherbutton errorAnotherButton"
        >
          <b>Check Another Product</b>
        </button>
      </div>
    </div>
  );
};

export default AlreadyUsed;
