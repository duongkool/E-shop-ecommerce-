import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MyProduct = () => {
  const userData = JSON.parse(localStorage.getItem("data"));

  const [dataProduct, setDataProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    let accessToken = userData.token;
    let url = "http://localhost/laravel8/public/api/user/my-product";
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get(url, config).then((res) => {
      setDataProduct(res.data);
    });
  }, []);
  const handleNavigate = (data) => {
    navigate("/account/product/update", { state: { data } });
  };

  const handleRenderProduct = () => {
    if (dataProduct) {
      const arrData = Object.values(dataProduct);
      console.log(arrData);

      return arrData.map((item, i) => {
        const arrImage = JSON.parse(item.image);
        console.log(arrImage[0]);

        return (
          <tr key={`product-${i}`}>
            <td className="cart_id">{item.id}</td>
            <td className="cart_description">
              <h4>
                <a href="">{item.name}</a>
              </h4>
            </td>
            <td className="cart_product">
              <a href="">
                <img
                  src={`http://localhost/laravel8/public/upload/product/${userData.Auth.id}/${arrImage[0]}`}
                  alt=""
                />
              </a>
            </td>

            <td className="cart_price">
              <p>${item.price}</p>
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
                  value="1"
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
              <p className="cart_total_price">${item.price}</p>
            </td>
            <td className="cart_delete">
              <a
                className="cart_quantity_edit"
                onClick={() => handleNavigate(item)}
              >
                <i className="fa fa-pencil-square"></i>
              </a>
              <a
                className="cart_quantity_delete"
                onClick={() => handleDeleteProduct(item.id)}
              >
                <i className="fa fa-times"></i>
              </a>
            </td>
          </tr>
        );
      });
    }
  };
  const handleDeleteProduct = (id) => {
    if (dataProduct) {
      const userData = JSON.parse(localStorage.getItem("data"));
      let accessToken = userData.token;
      let url = `http://localhost/laravel8/public/api/user/product/delete/${id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      axios.get(url, config).then((res) => {
        console.log(res);
        setDataProduct(res.data);
      });
    }
  };

  return (
    <>
      <section id="cart_items">
        <div className="col-sm-9">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="id">ID</td>
                  <td className="description">Name</td>
                  <td className="image">Image</td>
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td className="total">Actions</td>
                  <td></td>
                </tr>
              </thead>

              <tbody>
                {handleRenderProduct()}
                {/* <tr>
                  <td className="cart_id">2</td>
                  <td className="cart_description">
                    <h4>
                      <a href="">Colorblock Scuba</a>
                    </h4>
                  </td>
                  <td className="cart_product">
                    <a href="">
                      <img
                        src="https://acecookvietnam.vn/wp-content/uploads/2017/08/HTNS-HU-TIEU-NAM-VANG.png"
                        alt=""
                      />
                    </a>
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
                        value="1"
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
                    <a className="cart_quantity_edit" href="">
                      <i className="fa fa-pencil-square"></i>
                    </a>
                    <a className="cart_quantity_delete" href="">
                      <i className="fa fa-times"></i>
                    </a>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => navigate("/account/product/add")}
            className="btn btn-default update"
          >
            Add new
          </button>
        </div>
      </section>
    </>
  );
};
export default MyProduct;
