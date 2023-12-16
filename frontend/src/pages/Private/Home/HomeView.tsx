import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Product } from "../../../types";
import { EffectFade } from "swiper/modules";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import Progress from "../../../components/Progress";
import NoContent from "../../../components/NoContent";
import useShoppingCartContext from "../../../context/ShoppingCart/hook";
import { AddShoppingCart, ArrowBack, ArrowForward } from "@mui/icons-material";

export default function HomeView(): JSX.Element {
  const carousel = useRef<null | HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { insertProductsInCart } = useShoppingCartContext();

  const images = [
    "public/banner-01.jpg",
    "public/banner-02.jpg",
    "public/banner-03.jpg",
    "public/banner-04.jpg",
    "public/banner-05.jpg",
  ];

  const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  };

  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth;
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await axios.get<Product[]>(
          "http://localhost:5000/products"
        );
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <React.Fragment>
      <Header />

      <main>
        <section id="banners">
          <Swiper
            modules={[EffectFade]}
            effect="fade"
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
          >
            {images.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Slide ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section id="cardapio">
          <section id="subtitle-buttons">
            <h2>Cardápio</h2>

            <div id="buttons">
              <IconButton className="icone" onClick={handleLeftClick}>
                <ArrowBack />
              </IconButton>

              <IconButton className="icone" onClick={handleRightClick}>
                <ArrowForward />
              </IconButton>
            </div>
          </section>

          {loading ? (
            <Progress />
          ) : products.length > 0 ? (
            <article id="container-carousel">
              <div id="carousel" ref={carousel}>
                {products.map((product: Product, index: number) => (
                  <Card key={index} sx={{ maxWidth: 300 }} className="card">
                    <CardMedia
                      component="img"
                      image={`public/${product.img}`}
                      alt="green iguana"
                    />
                    <CardContent className="card-content">
                      <Box>
                        <Typography gutterBottom variant="h6" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          R$ {product.price}
                        </Typography>
                      </Box>

                      <IconButton 
                        size="large"
                        className="card-icon"
                        onClick={() => { insertProductsInCart() }} 
                      >
                        <AddShoppingCart />
                      </IconButton>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </article>
          ) : (
            <NoContent />
          )}
        </section>
      </main>

      <Footer />
    </React.Fragment>
  );
}
