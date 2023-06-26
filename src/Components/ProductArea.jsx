import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const ProductArea = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await apiClient.get("/product");
    if (res.status === 200) {
      setLoading(false);
      setProducts(res.data || []);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  SwiperCore.use([Autoplay]);

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-xl-3 col-sm-4 d-sm-block d-none my-auto">
          <div className="branding my-4 ps-5">
            <b>NEW FLAVORS DROPPING EVERY MONTH! FOLLOW US ON INSTAGRAM</b>
          </div>
          <div className="col-lg-3 col-12 my-auto ms-lg-3 ps-5">
            <span className="astroExtract text-center">
              <b> @ASTRO_EXTRACT </b>
            </span>
          </div>
        </div>
        <div className="col-sm-6 col-12 my-auto products align-items-center">
          {loading && (
            <div className="d-flex align-items-center justify-content-center">
              <span className="spinner-border" role="status">
                <span className="sr-only"></span>
              </span>
            </div>
          )}
          <Swiper
            slidesPerView={5}
            autoplay={true}
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
          >
            {products?.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="col-lg-8 col-md-6 pb-0">
                  <img
                    src={data?.image}
                    className=" img-fluid"
                    alt=""
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductArea;
