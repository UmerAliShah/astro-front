import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../App";
import BackgroundImg from "../assets/background-toolarea.png";
import { useNavigate } from "react-router-dom";
import apiClient, { setAuthToken } from "../api/apiClient";
import useApi from "../hooks/useApi";
import { useDispatch } from "react-redux";
import { login } from "../redux/counterSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const LoginArea = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let loginState = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(true);
  const [loginData, setLoginData] = useState(loginState);
  const handleChange = (key, value) => {
    setLoginData({ ...loginData, [key]: value });
  };
  const { request, loading, error } = useApi((data) =>
    apiClient.post("/auth/login", data)
  );
  const getusers = useApi(() => apiClient.get("auth/user-info"));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await request(loginData);
    if (result.status === 200) {
      setAuthToken(result?.data?.token);

      navigate("/admin");

      const res = await getusers.request();
      dispatch(login({ token: result?.data?.token, user: res?.data }));
    } else if (result.status === 404) {
      toast.error(result.data);
    } else if (result.status === 400) {
      toast.error(result.data);
    } else {
      toast.error("Error!");
    }
  };
  const styles = {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "100vh",
    overflow: "hidden",
  };
  return (
    <div className="main " style={styles}>
      <Header backgroundColor="#f9b656" page="mainPage" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 toolArea">
            <div className="bg-white w-75" style={{ borderRadius: "3.4rem" }}>
              <form className="toolArea" onSubmit={handleSubmit}>
                <div className=" mx-auto">
                  <div className=" d-flex flex-column align-items-center justify-content-center">
                    <div className="logo" style={{ width: "10rem" }}>
                      <img
                        width={"100%"}
                        src={require("../assets/logo.png")}
                        alt=""
                        className=" mw-100"
                      />
                    </div>
                  </div>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Email:"
                    className="form-control input shadow-none bg-transparent rounded-0 py-2 px-0 my-3 mx-0 border border-primary border-bottom-2 border-start-0 border-top-0 border-end-0 fs-5"
                  />
                  <div className="position-relative">
                    <input
                      value={loginData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="form-control input shadow-none bg-transparent rounded-0 py-2 ps-0 pe-4 my-3 mx-0 border border-primary border-bottom-2 border-start-0 border-top-0 border-end-0 fs-5"
                      type={showPassword ? "password" : "text"}
                      name
                      id
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="show-password bg-transparent border-0 position-absolute end-0 top-0 lh-lg fs-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-fill" />
                      ) : (
                        <i class="bi bi-eye-slash-fill" />
                      )}
                    </button>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="verifyButton bg-blue rounded-pill text-white fs-3 border-0 px-5 lh-lg"
                    >
                      {loading && (
                        <span class="spinner-border" role="status">
                          <span class="sr-only"></span>
                        </span>
                      )}
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default LoginArea;
