import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import VerifiedArea from "../../Components/VerifiedArea";
import BackgroundImg from "../../assets/verify-background.png";

const verified = () => {
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
      <Header backgroundColor="#2e9f39" page="verifiedPage" />
      <div className="container-fluid">
        <div
          className="row m-auto bg-white w-75"
          style={{ borderRadius: "3.4rem" }}
        >
          <div className=" col-12 ">
            <VerifiedArea />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default verified;
