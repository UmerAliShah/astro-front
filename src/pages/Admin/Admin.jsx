import "../../App.css";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import AdminArea from "../../Components/AdminArea";
import BackgroundImg from "../../assets/background-toolarea.png";

const Admin = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <AdminArea />
        </div>
      </div>
    </div>
  );
};

export default Admin;
