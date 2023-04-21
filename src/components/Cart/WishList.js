import { useEffect, useState, useContext } from "react";
import axios from "axios";
import _ from "lodash";

const Wishlist = () => {
  const [productList, setProductList] = useState([]);
  const [listWish, setListWish] = useState([]);
  const dataWishList = JSON.parse(localStorage.getItem("dataWishList"));
  const keyId = Object.keys(dataWishList);

  useEffect(() => {
    const handleGetdata = async () => {
      axios.get("http://localhost/laravel8/public/api/product").then((res) => {
        setProductList(res.data);
      });
    };
    handleGetdata();
  }, []);
  const handldeGetDataProduct = () => {
    if (Object.keys(productList).length) {
      let cloneListProduct = _.cloneDeep(productList);
      let filteredProducts = keyId.map((item) => {
        return cloneListProduct.find((obj) => obj.id === +item);
      });
      if (filteredProducts) {
        return filteredProducts.map((item, i) => {
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
                          // onClick={() => handleAddToCart(item.id)}
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </a>
                        <a
                          // onClick={() => handleNavigate(item)}
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
                      <a
                      // onClick={() => handleAddWishList(item.id)}
                      >
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
    }
  };

  const handleRenderProductWishList = () => {
    //   if (dataHomePage) {
    //     return dataHomePage.map((item, i) => {
    //       const arrImage = JSON.parse(item.image);
    //       return (
    //         <div className="col-sm-4">
    //           <div className="product-image-wrapper">
    //             <div className="single-products">
    //               <div className="productinfo text-center">
    //                 <img
    //                   src={`http://localhost/laravel8/public/upload/product/${item.id_user}/${arrImage[0]}`}
    //                   alt=""
    //                 />
    //                 <h2>${item.price}</h2>
    //                 <p>{item.name}</p>
    //                 <a href="#" className="btn btn-default add-to-cart">
    //                   <i className="fa fa-shopping-cart"></i>Add to cart
    //                 </a>
    //               </div>
    //               <div className="product-overlay">
    //                 <div className="overlay-content">
    //                   <h2>${item.price}</h2>
    //                   <p>{item.name}</p>
    //                   <div className="overlay_more">
    //                     <a
    //                       onClick={() => handleAddToCart(item.id)}
    //                       className="btn btn-default add-to-cart"
    //                     >
    //                       <i className="fa fa-shopping-cart"></i>Add to cart
    //                     </a>
    //                     <a
    //                       onClick={() => handleNavigate(item)}
    //                       className="btn btn-default add-to-cart"
    //                     >
    //                       More
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="choose">
    //               <ul className="nav nav-pills nav-justified">
    //                 <li>
    //                   <a href="#">
    //                     <i className="fa fa-plus-square"></i>Add to wishlist
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#">
    //                     <i className="fa fa-plus-square"></i>Add to compare
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     });
    //   }
  };

  return (
    <>
      <div className="features_items">
        <h2 className="title text-center">WishList Items</h2>
        {handldeGetDataProduct()}
        {/* {handleRenderProduct()} */}
      </div>
    </>
  );
};
export default Wishlist;
