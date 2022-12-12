import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { useUrl } from "../hooks/useUrl";
import {
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";

const Sw = ({ endpoint }) => {
    
  const navigate = useNavigate();

  //getting the data via custom hooks
  const { res: data, loading, error } = useUrl(endpoint,1, "");

  return (
    <>
      {loading ? (
        <Box display="flex" sx={{ gap: 2 }}>
          <Skeleton variant="rectangular" />
          <Skeleton variant="rectangular" />
          <Skeleton variant="rectangular" />
        </Box>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper"
          style={{ width: "100%", mt: "1em", mb: "1em" }}
        >
          {data.map((movie) => (
            <SwiperSlide k style={{ width: "100%" }} key={movie.id}>
              <img
                style={{ width: "100%" }}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />

              <Button
                onClick={() => navigate(`/${movie.id}`, { replace: true })}
                startIcon={<ArrowOutwardIcon />}
              >
                <Typography variant="body2">{movie.title}</Typography>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Sw;
