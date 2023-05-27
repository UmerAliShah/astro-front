import "../App.css";
const Footer = () => {
  const isMobile = window.innerWidth < 575;
  const isSmallHeight = window.innerHeight < 570;
  return (
    <div className={`col-12 ${isSmallHeight ? "" : "fixed-bottom"} `}>
      <div className=" footer flex-sm-row flex-column w-100">
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
