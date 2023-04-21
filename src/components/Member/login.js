import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorForm from "./ErrorForm";
import { submitLogin } from "../../services/UserServices";
const Login = (props) => {
  const [inputs, setInputs] = useState({ email: "", password: "", level: 0 });
  const navigate = useNavigate();
  const [err, setErr] = useState({});

  const handleInputs = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  const handlesubmitApiLogin = async () => {
    let res = await submitLogin(inputs);
    if (res && res.data && res.data.errors) {
      setErr(res.data.errors);
    } else {
      localStorage.setItem("data", JSON.stringify(res.data));
      navigate("/");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (inputs.email == "") {
      errorsSubmit.email = "vui long nhap email";
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
    if (!flag) {
      setErr(errorsSubmit);
    }
    if (flag) {
      setErr({});
      handlesubmitApiLogin();
    }
  };
  return (
    <>
      <div class="col-sm-4 col-sm-offset-1">
        <div class="login-form">
          <h2>Login to your account</h2>
          <ErrorForm err={err} />
          <form action="#" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleInputs}
            />
            <input
              name="password"
              onChange={handleInputs}
              type="password"
              placeholder="password"
            />
            <input onChange={handleInputs} type="level" placeholder="level" />

            <span>
              <input type="checkbox" class="checkbox" />
              Keep me signed in
            </span>
            <button type="submit" class="btn btn-default">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
