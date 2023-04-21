import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useDispatch } from "react-redux";
import { addCounter, removeCounter } from "../../redux/action/actions";
const HomePage = () => {
  const [dataHomePage, setDataHomePage] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (data) => {
    navigate(`/product/detail/${data.id}`);
  };
  const [cartProduct, setCartProduct] = useState(
    JSON.parse(localStorage.getItem("dataCart"))
      ? JSON.parse(localStorage.getItem("dataCart"))
      : {}
  );
  const [wishListProduct, setWishListProduct] = useState({});
  const { setCartCount } = useContext(CartContext);

  useEffect(() => {
    const handleGetdata = async () => {
      axios.get("http://localhost/laravel8/public/api/product").then((res) => {
        setDataHomePage(res.data);
      });
    };
    handleGetdata();
  }, []);
  const handleRenderProduct = () => {
    if (dataHomePage) {
      return dataHomePage.map((item, i) => {
        const arrImage = JSON.parse(item.image);
        return (
          <div className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img
                    src={`http://localhost/laravel8/public/upload/product/${item.id_user}/${arrImage[0]}`}
                    alt=""
                  />
                  <h2>${item.price}</h2>
                  <p>{item.name}</p>
                  <a href="#" className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart"></i>Add to cart
                  </a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${item.price}</h2>
                    <p>{item.name}</p>
                    <div className="overlay_more">
                      <a
                        onClick={() => handleAddToCart(item.id)}
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                      <a
                        onClick={() => handleNavigate(item)}
                        className="btn btn-default add-to-cart"
                      >
                        More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <a onClick={() => handleAddWishList(item.id)}>
                      <i className="fa fa-plus-square"></i>Add to wishlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-plus-square"></i>Add to compare
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  const handleAddToCart = (productId) => {
    if (cartProduct.hasOwnProperty(productId)) {
      setCartProduct((prevCartProduct) => {
        const updatedProducts = {
          ...prevCartProduct,
          [productId]: prevCartProduct[productId] + 1,
        };
        localStorage.setItem("dataCart", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    } else {
      setCartProduct((prevCartProduct) => {
        const updatedProducts = {
          ...prevCartProduct,
          [productId]: 1,
        };
        localStorage.setItem("dataCart", JSON.stringify(updatedProducts));
        setCartCount((state) => state + 1);
        return updatedProducts;
      });
    }
  };
  const handleAddWishList = (productId) => {
    if (wishListProduct.hasOwnProperty(productId)) {
      setWishListProduct((prevWishListProduct) => {
        const updatedWishlistProducts = {
          ...prevWishListProduct,
          [productId]: prevWishListProduct[productId] + 1,
        };
        localStorage.setItem(
          "dataWishList",
          JSON.stringify(updatedWishlistProducts)
        );
        return updatedWishlistProducts;
      });
    } else {
      setWishListProduct((prevWishListProduct) => {
        const updatedWishlistProducts = {
          ...wishListProduct,
          [productId]: 1,
        };
        localStorage.setItem(
          "dataWishList",
          JSON.stringify(updatedWishlistProducts)
        );
        dispatch(addCounter());
        return updatedWishlistProducts;
      });
    }
  };
  return (
    <>
      <div className="features_items">
        <h2 className="title text-center">Features Items</h2>
        {handleRenderProduct()}
      </div>
    </>
  );
};
export default HomePage;
