import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import styles from './HeroCarousel.module.css';

const slides = [
  { title: 'Hasta 30% OFF en productos seleccionados', imageUrl: '/images/slide-ofertas.jpg', buttonText: 'Ver ofertas', buttonHref: '/ofertas' },
  { title: 'Compra online y retira en tienda',       imageUrl: '/images/slide-retira.jpg',  buttonText: 'Elegir tienda', buttonHref: '/tiendas' },
  { title: 'Pide despacho a domicilio',             imageUrl: '/images/slide-despacho.jpg', buttonText: 'Ver despacho',  buttonHref: '/despacho' },
];

export default function HeroCarousel() {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={styles.slide}>
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className={styles.slideImg}
              />
              <div className={styles.overlay}>
                <h2 className={styles.title}>{slide.title}</h2>
                {slide.buttonText && (
                  <a href={slide.buttonHref} className={styles.button}>
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
