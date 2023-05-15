import Header from "../../components/Header";
import ErrorArea from "../../components/AlreadyUsedArea";
import BackgroundImg from "../../assets/background-error.png";
import Footer from "../../components/Footer";
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
