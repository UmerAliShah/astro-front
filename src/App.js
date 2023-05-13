import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Main from "./pages/Main/Main";
import Verified from "./pages/Verified/Verified";
import Error from "./pages/Error/Error";
import Login from "./components/LoginArea";
import Admin from "./pages/Admin/Admin";
import { useSelector } from "react-redux";
import CreateProduct from "./components/ProductCreationArea";
import QRarea from "./components/QRgenerateArea";
import AdminArea from "./components/AdminArea";
import AllProducts from "./components/AllProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {!user?.isAdmin ? (
          <Route path="/" element={<Main />} />
        ) : (
          <Route path="/*" element={<Admin />} />
        )}
        <Route path="/login" element={<Login />} />
        {user?.isAdmin ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/*" element={<Main />} />
        )}
        <Route path="/verified" element={<Verified />} />
        <Route path="/error" element={<Error />} />
        {user?.isAdmin ? (
          <Route element={<AdminArea />}>
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/generateQR" element={<QRarea />} />
            <Route path="/all-products" element={<AllProducts />} />
          </Route>
        ) : (
          <Route path="/*" element={<Main />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
