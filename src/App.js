import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Main from "./pages/Main/Main";
import Verified from "./pages/Verified/Verified";
import Error from "./pages/Error/Error";
import Login from "./Components/LoginArea";
import Admin from "./pages/Admin/Admin";
import { useSelector } from "react-redux";
import CreateProduct from "./Components/ProductCreationArea";
import QRarea from "./Components/QRgenerateArea";
import AdminArea from "./Components/AdminArea";
const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
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
          </Route>
        ) : (
          <Route path="/*" element={<Main />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
