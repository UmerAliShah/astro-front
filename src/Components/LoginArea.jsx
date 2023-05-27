import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import BackgroundImg from "../assets/main-background.png";
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
  const isMobileScreen = window.innerWidth < 575;
  useEffect(() => {
    if (!isMobileScreen) {
      document.body.style.backgroundImage = `url(${BackgroundImg})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    }
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header backgroundColor="#f9b656" page="mainPage" />
      <div
        className={`flex-grow-1 d-flex justify-content-center align-items-center ${
          isMobileScreen ? "bg-white" : ""
        }`}
      >
        <div
          className="p-xl-5 px-md-3 px-0 py-3 bg-white rounded-4"
          style={{ width: "80%", maxWidth: "100%" }}
        >
          <form className="" onSubmit={handleSubmit}>
            <div className=" mx-auto">
              <div className=" d-flex flex-column align-items-center justify-content-center">
                <div className="logo" style={{ width: "10rem" }}>
                  <img
                    width={"100%"}
                    src={require("../assets/logo.png")}
                    alt=""
                  />
                </div>
              </div>
              <div className="py-5">
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email:"
                  id="verificationCode"
                  className=" bg-white mt-5 form-control mx-auto"
                />

                <div
                  className="row mx-auto border my-2 rounded-pill mb-3"
                  id="verificationCode"
                  style={{ background: "#E8F0FE" }}
                >
                  <div className="col-10">
                    <input
                      value={loginData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className=" mx-auto form-control border-0 bg-white"
                      type={showPassword ? "password" : "text"}
                      name
                      placeholder="Password"
                    />
                  </div>
                  <div className="col-2">
                    <button
                      type="button"
                      className="show-password bg-transparent border-0 fs-4 "
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-fill" />
                      ) : (
                        <i class="bi bi-eye-slash-fill" />
                      )}
                    </button>
                  </div>
                </div>
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
      <Footer />
    </div>
  );
};
export default LoginArea;
