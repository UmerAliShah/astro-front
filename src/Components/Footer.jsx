import "../App.css";
const Footer = () => {
  return (
    <div className="col-12">
      <div className=" footer w-100">
        <div className="">
          <img
            src={require("../assets/mainPageLogo.png")}
            className="img-fluid footerImg"
            alt="footer logo"
          />
        </div>
        <div className="footerText">
          <b>2023 ASTRO EXTRACTS</b>
        </div>
      </div>
    </div>
  );
};

export default Footer;
