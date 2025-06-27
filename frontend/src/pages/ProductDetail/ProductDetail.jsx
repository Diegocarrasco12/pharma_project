import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "./products";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cart from "../../components/Cart";
import ScrollTopLogo from "../../components/ScrollTopLogo";

import { useCart } from "../../context/CartContext";

import styles from "./ProductDetail.module.css";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const { addToCart, toggleCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!product) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <h2 style={{ color: "red", textAlign: "center" }}>
            Producto no encontrado
          </h2>
          <a href="/" className={styles.buttonSmall}>
            Volver al inicio
          </a>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    // Convertimos el campo "precio" a "price" para evitar errores
    const productForCart = {
      ...product,
      price: product.precio
    };

    addToCart(productForCart);
    toggleCart(); // Abre el carrito
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={product.imagen}
              alt={product.nombre}
              className={styles.image}
            />
          </div>

          <div className={styles.details}>
            <h1 className={styles.title}>{product.nombre}</h1>
            <p className={styles.price}>{product.precio}</p>

            <p className={styles.stock}>
              <strong>{product.stock}</strong> disponibles
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Categoría:</strong> {product.categoria}
            </p>
            <p>
              <strong>Laboratorio:</strong> {product.laboratorio}
            </p>

            {product.principio_activo && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Principio activo</h2>
                <p className={styles.sectionText}>{product.principio_activo}</p>
              </div>
            )}

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Acción terapéutica</h2>
              <p className={styles.sectionText}>{product.accion_terapeutica}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ficha técnica</h2>
              <p className={styles.sectionText}>{product.ficha_tecnica}</p>
            </div>

            <p>
              <strong>Precio por unidad fraccionada:</strong>{" "}
              {product.precio_fraccionado}
            </p>

            {/* ✅ Botones perfectamente alineados y funcionales */}
            <div className={styles.buttonGroup}>
              <button
                onClick={() => (window.location.href = "/")}
                className={styles.button}
              >
                Volver al inicio
              </button>

              <button onClick={handleAddToCart} className={styles.buttonAdd}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <Cart />
      <Footer />
      <ScrollTopLogo />
    </>
  );
}

export default ProductDetail;
