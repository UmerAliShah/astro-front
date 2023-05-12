import "../../App.css";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import AdminArea from "../../Components/AdminArea";
import BackgroundImg from "../../assets/background-toolarea.png";

const Admin = () => {
  const styles = {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "100vh",
    overflow: "hidden",
  };
  return (
    <div style={styles}>
      <Header backgroundColor="#f9b656" page="mainPage" />
      <div className="container-fluid">
        <div className="row">
          <AdminArea />
        </div>
      </div>
    </div>
  );
};

export default Admin;
