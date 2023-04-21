import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategoryBrand } from "../../services/UserServices";

import ErrorForm from "../Member/ErrorForm";
import axios from "axios";

const UpdateProduct = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [avaterCheck, setAvatarCheck] = useState([]);
  const userData = JSON.parse(localStorage.getItem("data"));

  const [err, setErr] = useState({});
  const [inputs, setInputs] = useState({
    name: data.name,
    price: data.price,
    category: data.category,
    brand: data.brand,
    company: data.company,
    detail: data.detail,
    status: "1",
    sale: "",
    avatar: "",
  });
  const handleInputs = (e) => {
    const nameInput = e.target.name;
    const value = nameInput === "avatar" ? e.target.files : e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  useEffect(() => {
    const handleGetCategoryBrand = async () => {
      let res = await getCategoryBrand();
      if (res && res.data) {
        setListBrand(res.data.brand);
        setListCategory(res.data.category);
      }
    };
    handleGetCategoryBrand();
  }, []);
  const handleRederBrand = () => {
    if (listBrand) {
      return listBrand.map((item, i) => {
        return (
          <option key={`brand-${item.id}`} value={item.id}>
            {item.brand}
          </option>
        );
      });
    }
  };
  const handleRederCategory = () => {
    if (listCategory) {
      return listCategory.map((item, i) => {
        return (
          <option key={`category-${item.id}`} value={item.id}>
            {item.category}
          </option>
        );
      });
    }
  };
  const handleCheckboxChange = (event, avatar) => {
    if (event.target.checked) {
      setAvatarCheck((state) => [...state, avatar]);
    } else {
      setAvatarCheck((state) => state.filter((item) => item !== avatar));
    }
  };

  const handleRenderImage = () => {
    if (data) {
      return JSON.parse(data.image).map((item, i) => {
        return (
          <>
            <a href="" className="cart_product ">
              <img
                src={
                  `http://localhost/laravel8/public/upload/product/${userData.Auth.id}/` +
                  item
                }
                alt=""
              />
              <input
                onChange={(event) => handleCheckboxChange(event, item)}
                type="checkbox"
              />
            </a>
          </>
        );
      });
    }
  };
  const validateImageSize = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 1024 * 1024) {
        return false;
      }
      return true;
    }
  };
  // kiem tra dinh dang cua anh
  const validateImageType = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        return false;
      }
      return true;
    }
  };
  const handleSubmitApiProduct = async () => {
    const userData = JSON.parse(localStorage.getItem("data"));
    let accessToken = userData.token;
    let url = `http://localhost/laravel8/public/api/user/product/update/${data.id}`;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("price", inputs.price);
    formData.append("category", inputs.category);
    formData.append("brand", inputs.brand);
    formData.append("company", inputs.company);
    formData.append("detail", inputs.detail);
    formData.append("status", inputs.status);
    formData.append("sale", inputs.sale);

    Object.keys(inputs.avatar).map((item, i) => {
      formData.append("file[]", inputs.avatar[item]);
    });
    formData.append("avatarCheckBox[]", avaterCheck);
    axios.post(url, formData, config).then((res) => {
      console.log(res);
      if (res && res.data) {
        setErr(res.response);
      } else {
        setErr(res.errors);
      }
    });
  };
  const handleSubmitUpdateProduct = (e) => {
    e.preventDefault();

    console.log(inputs);
    let errorsSubmit = {};
    let flag = true;
    if (inputs.name == "") {
      errorsSubmit.name = "vui lòng nhập tên";
      flag = false;
    }
    if (inputs.price == "") {
      errorsSubmit.price = "vui lòng nhập giá";
      flag = false;
    }
    if (inputs.category == "") {
      errorsSubmit.category = "vui long chọn danh mục";
      flag = false;
    }
    if (inputs.brand == "") {
      errorsSubmit.brand = "vui lòng nhập chọn thương hiệu";
      flag = false;
    }
    if (inputs.company == "") {
      errorsSubmit.company = "vui lòng nhập doanh nghiệp";
      flag = false;
    }
    if (inputs.avatar && validateImageSize(inputs.avatar) === false) {
      errorsSubmit.file =
        " Kích thước của tệp hình ảnh vượt quá giới hạn cho phép";
      flag = false;
    }
    if (inputs.avatar && validateImageType(inputs.avatar) === false) {
      errorsSubmit.file = " Định dạng tệp hình ảnh không hợp lệ";
      flag = false;
    }
    if (flag === false) {
      setErr(errorsSubmit);
    }
    if (flag) {
      setErr({});
      handleSubmitApiProduct();
    }
  };

  return (
    <>
      <div className="col-sm-8">
        <div className="signup-form">
          <h2>Update product!</h2>
          <ErrorForm err={err} />
          <form
            action="#"
            encType="multipart/form-data"
            onSubmit={handleSubmitUpdateProduct}
          >
            <input
              onChange={handleInputs}
              name="name"
              type="text"
              value={inputs.name}
              placeholder="Name"
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={inputs.price}
              onChange={handleInputs}
            />
            <select name="category" onChange={handleInputs}>
              <option value="" disabled selected hidden>
                Please choose catagory
              </option>
              {handleRederCategory()}
            </select>
            <select onChange={handleInputs} name="brand">
              <option value="" disabled selected hidden>
                Please choose brand
              </option>
              {handleRederBrand()}
            </select>
            <select name="status" onChange={handleInputs}>
              <option value="" disabled selected hidden>
                Sale
              </option>
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>
            {inputs.status === "0" && (
              <input
                onChange={handleInputs}
                type="number"
                id="discount"
                name="sale"
                min="0"
                max="100"
                step="1"
                placeholder="Nhập giảm giá (%)"
                required
              />
            )}

            <input
              onChange={handleInputs}
              name="company"
              type="text"
              placeholder="Company profile"
            />
            <input onChange={handleInputs} name="avatar" type="file" multiple />
            <div className="image_update">{handleRenderImage()}</div>
            <input
              onChange={handleInputs}
              name="detail"
              type="text"
              placeholder="Detail"
            />
            <button type="submit" className="btn btn-default">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default UpdateProduct;
