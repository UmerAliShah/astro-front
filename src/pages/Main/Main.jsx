import { Link } from "react-router-dom";
import "../../App.css";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ToolArea from "../../Components/ToolArea";
import BackgroundImg from "../../assets/main-background.png";
import HeaderLogo from "../../assets/mainPageLogo.png";

const Main = () => {
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
      <Header
        headerLogo={HeaderLogo}
        backgroundColor="#f9b656"
        page="mainPage"
      />
      <div className="container-fluid">
        <div
          className="row m-auto bg-white w-75"
          style={{ borderRadius: "3.4rem" }}
        >
          <div className="col-12 my-auto">
            <ToolArea />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Main;
