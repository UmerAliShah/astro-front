import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import VerifiedArea from "../../Components/VerifiedArea";
import BackgroundImg from "../../assets/background-verified.png";

const verified = () => {
  const styles = {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "100vh",
    overflow: "hidden",
  };
  return (
    <div className="vh-100 background" style={styles}>
      <Header backgroundColor="#2e9f39" page="verifiedPage" />
      <div className="container-fluid">
        <div className="row">
          <div className="verifyArea col-12 ">
            <div className="bg-white w-75" style={{ borderRadius: "3.4rem" }}>
              <VerifiedArea />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default verified;
