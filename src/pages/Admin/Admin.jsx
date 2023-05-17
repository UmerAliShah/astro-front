import "../../App.css";
import BackgroundImg from "../../assets/background-admin.jpg";
import AdminArea from "../../Components/AdminArea";

const Admin = () => {
  const styles = {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "100vh",
    overflow: "hidden",
  };
  return (
    <div className="background" style={styles}>
      <div className="container-fluid">
        <div className="row">
          <AdminArea />
        </div>
      </div>
    </div>
  );
};

export default Admin;
