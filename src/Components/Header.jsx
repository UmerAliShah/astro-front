import { Link } from "react-router-dom";
import "../App.css";

const Header = ({ backgroundColor, page, headerLogo }) => {
  return (
    <nav
      style={{ backgroundColor }}
      className={`${page} navbar navbar-expand-lg px-0 header fixed-top`}
    >
      <div className="row mx-auto">
        <div className="col">
          <Link to="/">
            <img
              src={headerLogo || require("../assets/logo.png")}
              className="img-fluid"
              alt="logo"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
