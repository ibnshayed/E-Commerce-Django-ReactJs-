import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { topProducts } from "../actions/productActions";
import CircularLoader from "./materialui/CircularLoader";
import Message from "./Message";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTop = useSelector((state) => state.productTop);
  const { products, loading, error } = productTop;

  useEffect(() => {
    dispatch(topProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <CircularLoader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Carousel hover="pause" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel.caption">
                  <h4>
                    {product.name} (${product.price})
                  </h4>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
