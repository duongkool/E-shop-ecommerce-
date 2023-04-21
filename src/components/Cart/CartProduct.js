import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import _, { set } from "lodash";

const CartProduct = () => {
  const [listProduct, setListProduct] = useState([]);
  const dataCart = JSON.parse(localStorage.getItem("dataCart"));
  const { setCartCount } = useContext(CartContext);

  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    axios
      .post(`http://localhost/laravel8/public/api/product/cart`, dataCart)
      .then((res) => {
        setListProduct(res.data);
      });
  }, []);
  const handleQuantityUp = (id) => {
    if (listProduct) {
      let cloneListProduct = _.cloneDeep(listProduct);
      let result = cloneListProduct.find((obj) => {
        return obj.id === id;
      });
      result.qty = result.qty + 1;
      setListProduct(cloneListProduct);
      if (dataCart && dataCart.hasOwnProperty(id)) {
        dataCart[id] = result.qty;
        localStorage.setItem("dataCart", JSON.stringify(dataCart));
      }
    }
  };

  const handleQuantityDown = (id) => {
    if (listProduct) {
      let cloneListProduct = _.cloneDeep(listProduct);
      let result = cloneListProduct.find((obj) => {
        return obj.id === id;
      });
      result.qty = result.qty - 1;
      if (result.qty === 0) {
        cloneListProduct = cloneListProduct.filter((obj) => obj.id !== id);
        setCartCount((state) => state - 1);
      }
      setListProduct(cloneListProduct);
      if (dataCart && dataCart.hasOwnProperty(id)) {
        dataCart[id] = result.qty;
        if (result.qty === 0) {
          delete dataCart[id];
        }
        localStorage.setItem("dataCart", JSON.stringify(dataCart));
      }
    }
  };
  const handleDeleteProduct = (id) => {
    if (listProduct) {
      let cloneListProduct = _.cloneDeep(listProduct);
      cloneListProduct = cloneListProduct.filter((obj) => obj.id !== id);
      setListProduct(cloneListProduct);
      setCartCount((state) => state - 1);

      if (dataCart && dataCart.hasOwnProperty(id)) {
        delete dataCart[id];
        localStorage.setItem("dataCart", JSON.stringify(dataCart));
      }
    }
  };

  const handleShowProduct = () => {
    let total = 0;
    if (listProduct && listProduct.length > 0) {
      return (
        <>
          {listProduct.map((item, i) => {
            const arrImage = JSON.parse(item.image);
            const totalPrice = item.price * item.qty;
            total += totalPrice;
            return (
              <tr key={`product-${i}`}>
                <td className="cart_product">
                  <a href="">
                    <img
                      src={`http://localhost/laravel8/public/upload/product/${item.id_user}/${arrImage[0]}`}
                      alt=""
                    />
                  </a>
                </td>
                <td className="cart_description">
                  <h4>
                    <a href="">{item.name}</a>
                  </h4>
                  <p>Web ID: {item.web_id}</p>
                </td>
                <td className="cart_price">
                  <p>${item.price}</p>
                </td>
                <td className="cart_quantity">
                  <div className="cart_quantity_button">
                    <a
                      className="cart_quantity_up"
                      onClick={() => handleQuantityUp(item.id)}
                    >
                      {" "}
                      +{" "}
                    </a>
                    <input
                      className="cart_quantity_input"
                      type="text"
                      name="quantity"
                      value={item.qty}
                      autoComplete="off"
                      size="2"
                    />
                    <a
                      className="cart_quantity_down"
                      onClick={() => handleQuantityDown(item.id)}
                    >
                      {" "}
                      -{" "}
                    </a>
                  </div>
                </td>
                <td className="cart_total">
                  <p className="cart_total_price">${item.price * item.qty}</p>
                </td>
                <td className="cart_delete">
                  <a
                    className="cart_quantity_delete"
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </td>
              </tr>
            );
          })}
          <tr className="cart_total_tr">
            <td colSpan="5" className="cart_total">
              <p className="cart_total_price">Total: ${total}</p>{" "}
            </td>
          </tr>
        </>
      );
    }
  };
  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description"></td>
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {handleShowProduct()}

                {/* <tr>
                  <td className="cart_product">
                    <a href="">
                      <img src="images/cart/one.png" alt="" />
                    </a>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href="">Colorblock Scuba</a>
                    </h4>
                    <p>Web ID: 1089772</p>
                  </td>
                  <td className="cart_price">
                    <p>$59</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <a className="cart_quantity_up" href="">
                        {" "}
                        +{" "}
                      </a>
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        // value="1"
                        autoComplete="off"
                        size="2"
                      />
                      <a className="cart_quantity_down" href="">
                        {" "}
                        -{" "}
                      </a>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">$59</p>
                  </td>
                  <td className="cart_delete">
                    <a className="cart_quantity_delete" href="">
                      <i className="fa fa-times"></i>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td className="cart_product">
                    <a href="">
                      <img src="images/cart/two.png" alt="" />
                    </a>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href="">Colorblock Scuba</a>
                    </h4>
                    <p>Web ID: 1089772</p>
                  </td>
                  <td className="cart_price">
                    <p>$59</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <a className="cart_quantity_up" href="">
                        {" "}
                        +{" "}
                      </a>
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        // value="1"
                        autoComplete="off"
                        size="2"
                      />
                      <a className="cart_quantity_down" href="">
                        {" "}
                        -{" "}
                      </a>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">$59</p>
                  </td>
                  <td className="cart_delete">
                    <a className="cart_quantity_delete" href="">
                      <i className="fa fa-times"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="cart_product">
                    <a href="">
                      <img src="images/cart/three.png" alt="" />
                    </a>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href="">Colorblock Scuba</a>
                    </h4>
                    <p>Web ID: 1089772</p>
                  </td>
                  <td className="cart_price">
                    <p>$59</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <a className="cart_quantity_up" href="">
                        {" "}
                        +{" "}
                      </a>
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        // value="1"
                        autoComplete="off"
                        size="2"
                      />
                      <a className="cart_quantity_down" href="">
                        {" "}
                        -{" "}
                      </a>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">$59</p>
                  </td>
                  <td className="cart_delete">
                    <a className="cart_quantity_delete" href="">
                      <i className="fa fa-times"></i>
                    </a>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
export default CartProduct;
