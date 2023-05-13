import { Link } from "react-router-dom";
import "../../App.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ToolArea from "../../components/ToolArea";
import BackgroundImg from "../../assets/background-toolarea.png";
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
    <div className="background" style={styles}>
      <Header
        headerLogo={HeaderLogo}
        backgroundColor="#f9b656"
        page="mainPage"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="toolArea col-12 ">
            <div className="bg-white w-75" style={{ borderRadius: "3.4rem" }}>
              <ToolArea />
            </div>
          </div>
            <Footer />
        </div>
      </div>
    </div>
  );
};

export default Main;
