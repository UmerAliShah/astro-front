import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Main from "./pages/Main/Main";
import Verified from "./pages/Verified/Verified";
import Error from "./pages/Error/Error";
import AlreadyUsed from "./pages/Error/AlreadyUSed";
import Login from "./Components/LoginArea";
import Admin from "./pages/Admin/Admin";
import { useSelector } from "react-redux";
import CreateProduct from "./Components/ProductCreationArea";
import QRarea from "./Components/QRgenerateArea";
import AdminArea from "./Components/AdminArea";
import AllProducts from "./Components/AllProducts";
import AllKeys from "./Components/AllKeys";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMainArea from "./Components/AdminMainArea";

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
        <Route path="/already-used" element={<AlreadyUsed />} />
        {user?.isAdmin ? (
          <Route element={<AdminArea />}>
            <Route path="/" element={<AdminMainArea />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/generateQR" element={<QRarea />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/all-keys" element={<AllKeys />} />
          </Route>
        ) : (
          <Route path="/*" element={<Main />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
