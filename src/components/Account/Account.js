import { useState } from "react";
import ErrorForm from "../Member/ErrorForm";
import { UpdateUser } from "../../services/UserServices";

const Account = () => {
  const userData = JSON.parse(localStorage.getItem("data"));
  const [inputs, setInputs] = useState({
    name: userData.Auth.name,
    password: "",
    email: userData.Auth.email,
    address: userData.Auth.address,
    phone: userData.Auth.phone,
    level: userData.Auth.level,
  });
  const [err, setErr] = useState({});
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState("");
  const handleInputs = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleUserInputFile = (e) => {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  };
  const validateImageSize = (file) => {
    // Kiểm tra kích thước của tệp hình ảnh
    if (file.size > 1024 * 1024) {
      // Kích thước của tệp hình ảnh vượt quá giới hạn cho phép
      return false;
    }
    return true;
  };
  // kiem tra dinh dang cua anh
  const validateImageType = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      // Định dạng tệp hình ảnh không hợp lệ
      return false;
    }
    return true;
  };

  const handleSubmitApiUpdate = async () => {
    let imputFormApi = { ...inputs, avatar };
    const isLogin = localStorage.getItem("data");
    let accessToken = userData.token;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };

    if (isLogin) {
      let res = await UpdateUser(userData.Auth.id, imputFormApi, config);
      console.log(res);
      if (res && res.data) {
        setErr({ success: "cập nhật thành công" });
      }
    } else {
      alert("đăng nhập để bình luận");
    }
  };
  const handleSubmitFormUpdate = (e) => {
    e.preventDefault();

    let errorsSubmit = {};
    let flag = true;
    if (inputs.name == "") {
      errorsSubmit.name = "vui lòng nhập tên";
      flag = false;
    }

    if (inputs.phone == "") {
      errorsSubmit.password = "vui lòng nhập số điện thoại";
      flag = false;
    }
    if (inputs.address == "") {
      errorsSubmit.address = "vui lòng nhập đại chỉ";
      flag = false;
    }
    if (file && validateImageSize(file) === false) {
      errorsSubmit.file =
        " Kích thước của tệp hình ảnh vượt quá giới hạn cho phép";
      flag = false;
    }
    if (file && validateImageType(file) === false) {
      errorsSubmit.file = " Định dạng tệp hình ảnh không hợp lệ";
      flag = false;
    }
    if (flag === false) {
      setErr(errorsSubmit);
    }
    if (flag) {
      setErr({});
      handleSubmitApiUpdate();
    }
  };

  return (
    <>
      <div className="col-sm-8">
        <div className="signup-form">
          <h2>User Update!</h2>
          <ErrorForm err={err} />
          <form
            action="#"
            encType="multipart/form-data"
            onSubmit={handleSubmitFormUpdate}
          >
            <input
              value={inputs.name}
              onChange={handleInputs}
              name="name"
              type="text"
              placeholder="Name"
            />

            <input
              readOnly
              value={inputs.email}
              onChange={handleInputs}
              name="email"
              type="email"
              placeholder="Email Address"
            />
            <input
              onChange={handleInputs}
              name="password"
              type="password"
              placeholder="Password"
            />
            <input
              onChange={handleInputs}
              value={inputs.phone}
              name="phone"
              type="number"
              placeholder="phone"
            />
            <input
              onChange={handleInputs}
              value={inputs.address}
              name="address"
              type="text"
              placeholder="address"
            />

            <input
              onChange={handleUserInputFile}
              name="avatar"
              type="file"
              placeholder="avatar"
            />
            <input
              onChange={handleInputs}
              value={inputs.level}
              name="level"
              type="text"
              placeholder="level"
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
export default Account;
