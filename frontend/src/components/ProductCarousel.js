import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import "../index.css";

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated) || {
    products: [],
  };
  const { loading, error, products } = productTopRated;
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Featured Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {products &&
            products.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    className="carousel-img"
                  />
                  <Carousel.Caption className="carousel-caption">
                    <h4 style={{ color: "#fff" }}>
                      {product.name} (Rs.{product.price})
                    </h4>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
        </Carousel>
      )}
    </div>
  );
}

export default ProductCarousel;
