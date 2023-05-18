import Header from "../../Components/Header";
import ErrorArea from "../../Components/ErrorArea";
import Footer from "../../Components/Footer";
const Error = () => {

  return (
    <div
      className="background errorArea d-flex justify-content-center align-items-center flex-column"
    >
      <Header backgroundColor="#e8484c" page="errorPage " />
      <div className="container-fluid">
        <div
          className="row m-auto bg-white w-75"
          style={{ borderRadius: "3.4rem" }}
        >
          <div className="col-12">
            <ErrorArea />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Error;
