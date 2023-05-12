const ProductArea = () => {
  return (
    <div className="col-12">
      <div className="row productArea">
        <div className="col-lg-3 col-md-4 col-sm-12 my-auto">
          <div className="branding my-4 ps-5">
            <b>NEW FLAVORS DROPPING EVERY MONTH! FOLLOW US ON INSTAGRAM</b>
          </div>
          <div className="col-lg-3 col-12 my-auto ms-lg-3 ps-5">
            <span className="astroExtract text-center">
              <b> @ASTRO_EXTRACT </b>
            </span>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 products">
          <div className="row pb-4  mt-2 justify-content-lg-start justify-content-center">
            <div className="col-2 px-sm-2 p-0">
              <img
                src={require("../assets/1.png")}
                className="img-fluid w-50"
                alt=""
              />
            </div>
            <div className="col-2  px-sm-2 p-0">
              <img
                src={require("../assets/2.png")}
                className="img-fluid w-50"
                alt=""
              />
            </div>
            <div className="col-2  px-sm-2 p-0">
              <img
                src={require("../assets/3.png")}
                className="img-fluid w-50"
                alt=""
              />
            </div>
            <div className="col-2  px-sm-2 p-0">
              <img
                src={require("../assets/4.png")}
                className="img-fluid w-50"
                alt=""
              />
            </div>
            <div className="col-2  px-sm-2 p-0">
              <img
                src={require("../assets/5.png")}
                className="img-fluid w-50"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductArea;
