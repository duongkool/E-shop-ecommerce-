import { useState } from "react";
import ErrorForm from "./ErrorForm";
import { submitForm } from "../../services/UserServices";
const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    email: "",
    address: "",
    phone: "",
    level: "0",
  });
  const [err, setErr] = useState({});
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState("");

  const handleInputs = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  // check email
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  // kiem tra kich thuoc cau iamge
  const validateImageSize = (file) => {
    if (file.size > 1024 * 1024) {
      return false;
    }
    return true;
  };
  // kiem tra dinh dang cua anh
  const validateImageType = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return false;
    }
    return true;
  };
  // xu li anh khi gui len api
  const handleUserInputFile = (e) => {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  };

  const handleSubmitApi = async () => {
    let imputFormApi = { ...inputs, avatar };
    let res = await submitForm(imputFormApi);
    console.log(res);
    if (res && res.data) {
      setErr({ success: "đăng kí thành công" });
    }
    if (res && res.data && res.data.errors) {
      setErr(res.data.errors);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    let errorsSubmit = {};
    let flag = true;
    if (inputs.name == "") {
      errorsSubmit.name = "vui lòng nhập tên";
      flag = false;
    }
    if (inputs.email == "") {
      errorsSubmit.email = "vui lòng nhập email";
      flag = false;
    }
    if (inputs.email !== "" && !isEmail(inputs.email)) {
      errorsSubmit.regexEmail = "Email không hợp lệ";
      flag = false;
    }
    if (inputs.password == "") {
      errorsSubmit.password = "vui long nhap mat khau";
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
      handleSubmitApi();
    }
  };
  return (
    <>
      <div class="col-sm-4">
        <div class="signup-form">
          <h2>New User Signup!</h2>
          <ErrorForm err={err} />
          <form
            action="#"
            encType="multipart/form-data"
            onSubmit={handleSubmitForm}
          >
            <input
              onChange={handleInputs}
              name="name"
              type="text"
              placeholder="Name"
            />

            <input
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
              name="phone"
              type="number"
              placeholder="phone"
            />
            <input
              onChange={handleInputs}
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
              name="level"
              type="text"
              placeholder="level"
            />
            <button type="submit" class="btn btn-default">
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
