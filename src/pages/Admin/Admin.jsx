import "../../App.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AdminArea from "../../components/AdminArea";
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
