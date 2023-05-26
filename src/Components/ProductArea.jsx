import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const ProductArea = () => {
  const isMobile = window.innerWidth <= "575px";
  console.log(isMobile);
  SwiperCore.use([Autoplay]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await apiClient.get("/product");
    if (res.status === 200) {
      setLoading(false);
      setProducts(res.data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const styles = {
    width: isMobile ? "500px" : "",
  };
  return (
    <div className="col-12">
      <div className="row productArea">
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
        <div className="col-sm-6 col-12 products align-items-center">
          <div className="row d-sm-block d-none pb-4 pt-xl-5 pt-1 justify-content-lg-start justify-content-center">
            {loading && (
              <div className="d-flex align-items-center justify-content-center">
                <span class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </span>
              </div>
            )}
            <Swiper
              slidesPerView={5}
              autoplay={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                320: {
                  // width: 400,
                  // height: 1200,
                  slidesPerView: 5,
                  spaceBetween: -30,
                },
                375: {
                  slidesPerView: 5,
                  spaceBetween: 100,
                },
                420: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 5,
                  spaceBetween: -20,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: -40,
                },
              }}
              className="mySwiper"
            >
              {products?.map((data, index) => {
                return (
                  <SwiperSlide>
                    <div className="col-6 pb-0" style={styles}>
                      <img src={data?.image} className="img-fluid" alt="" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="d-sm-none d-block row pt-sm-5 pt-2 justify-content-lg-start justify-content-center">
        {loading && (
          <div className="d-flex align-items-center justify-content-center">
            <span class="spinner-border" role="status">
              <span class="sr-only"></span>
            </span>
          </div>
        )}
        <Swiper
          slidesPerView={5}
          // autoplay={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              // width: 400,
              // height: 1200,
              slidesPerView: 5,
              spaceBetween: -30,
            },
            375: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            420: {
              slidesPerView: 5,
              spaceBetween: -5,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: -20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: -40,
            },
          }}
          className="mySwiper"
        >
          {products?.map((data, index) => {
            return (
              <SwiperSlide>
                <div className="col-6 pb-0" style={styles}>
                  <img src={data?.image} width={60} alt="" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductArea;
