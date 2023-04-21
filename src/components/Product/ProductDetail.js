import { useParams } from "react-router-dom";
import { getCategoryBrand } from "../../services/UserServices";
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = (props) => {
  const params = useParams();
  const productId = params.id;
  const [data, setData] = useState({});

  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const handleGetCategoryBrand = async () => {
      let res = await getCategoryBrand();
      if (res && res.data) {
        setListBrand(res.data.brand);
        setListCategory(res.data.category);
      }
    };
    const getDataProduct = () => {
      axios
        .get(`http://localhost/laravel8/public/api/product/detail/${productId}`)
        .then((res) => {
          setData(res.data);
        });
    };
    handleGetCategoryBrand();
    getDataProduct();
  }, []);
  const findObjectWithId = (arr, id) => {
    if (arr)
      return arr.find((obj) => {
        return obj.id === id;
      });
  };
  const handleRenderBrand = () => {
    if (listBrand) {
      const result = findObjectWithId(listBrand, data.id_brand);
      if (result) {
        return (
          <p>
            <b>Brand:</b> {result.brand}
          </p>
        );
      }
    }
  };
  const handleRenderImage = () => {
    if (Object.keys(data).length) {
      const arrImage = JSON.parse(data.image);
      return (
        <img
          src={`http://localhost/laravel8/public/upload/product/${data.id_user}/${arrImage[0]}`}
          alt=""
        />
      );
    }
  };
  const handleRenderImageSlider = () => {
    if (Object.keys(data).length) {
      const arrImage = JSON.parse(data.image);
      return arrImage.map((item, i) => {
        return (
          <a key={`image-${i}`} href="">
            <img
              src={`http://localhost/laravel8/public/upload/product/${data.id_user}/${item}`}
              alt=""
            />
          </a>
        );
      });
    }
  };

  return (
    <>
      {data && (
        <div className="product-details">
          <div className="col-sm-5">
            <div className="view-product">
              {handleRenderImage()}
              <a onClick={() => setShow(true)}>
                <h3>ZOOM</h3>
              </a>
            </div>
            <div
              id="similar-product"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="item active">{handleRenderImageSlider()}</div>
              </div>

              <a
                className="left item-control"
                href="#similar-product"
                data-slide="prev"
              >
                <i className="fa fa-angle-left"></i>
              </a>
              <a
                className="right item-control"
                href="#similar-product"
                data-slide="next"
              >
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
          <div className="col-sm-7">
            <div className="product-information">
              <img
                className="newarrival"
                src={`http://localhost/laravel8/public/upload/icon/new.jpg/`}
                alt=""
              />
              <h2>{data.name}</h2>
              <p>Web ID: {data.id}</p>
              <img src="images/product-details/rating.png" alt="" />
              <span>
                <span>US ${data.price}</span>
                <label>Quantity:</label>
                <input type="text" />
                <button type="button" className="btn btn-fefault cart">
                  <i className="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              </span>
              <p>
                <b>Availability:</b> In Stock
              </p>
              <p>
                <b>Condition:</b> New
              </p>
              {handleRenderBrand()}
              <a href="">
                <img
                  src="images/product-details/share.png"
                  className="share img-responsive"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      )}
      {data && (
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Body>{handleRenderImage()}</Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default ProductDetail;
