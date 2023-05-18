import Header from "../../Components/Header";
import ErrorArea from "../../Components/AlreadyUsedArea";
import Footer from "../../Components/Footer";
const Error = () => {
  return (
    <div className="background errorArea d-flex justify-content-center align-items-center flex-column">
      <Header backgroundColor="#e8484c" page="errorPage " />
      <div className="container-fluid">
        <div className="bg-white m-auto row w-75" style={{ borderRadius: "3.4rem" }}>
          <div className=" col-12">
            <div>
              <ErrorArea />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
