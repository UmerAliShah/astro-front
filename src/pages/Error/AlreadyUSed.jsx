import Header from "../../Components/Header";
import ErrorArea from "../../Components/AlreadyUsedArea";
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
    <div className="background" style={styles}>
      <Header backgroundColor="#e8484c" page="errorPage " />
      <div className="container-fluid">
        <div className="row ">
          <div className="errorArea col-12">
            <div className="bg-white w-75" style={{ borderRadius: "3.4rem" }}>
              <ErrorArea />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
