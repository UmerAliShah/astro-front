import Header from "../../Components/Header";
import ErrorArea from "../../Components/ErrorArea";
import BackgroundImg from "../../assets/error-background.png";
import Footer from "../../Components/Footer";
const Error = () => {
  const styles = {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "100vh",
    overflow: "hidden",
  };
  return (
    <div
      className="background d-flex justify-content-center align-items-center flex-column"
      style={styles}
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
