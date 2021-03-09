import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/login.css";

import Img1 from "../img/img1.png";
import Logo from "../img/logo.png";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Страница входа на сайт крипто лотереи SevenTop";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Для регистрации потребуется ввести логин, электронную почту, пароль,  и адрес крипто кошелька Tron который вы сможете получить, скачав приложение Tronlink, а также логин или кошелек друга, если он Вас пригласил."
      );
  }, []);

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="loginpage">
      <header className="header" id="header">
        <div className="container">
          <img className="logo-mob" src={Img1} alt="logo-mobile" />
          <div className="content">
            <img className="logo2" src={Logo} alt="logo" />
            <form action="#">
              <div className="input-container">
                <i className="fa fa-user icon1"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <i className="fa fa-key icon1"></i>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={changeHandler}
                />
              </div>

              <button
                type="submit"
                className="btn"
                //   onClick={loginHandler}
                //   disabled={loading}
              >
                Login
              </button>
              <div className="register">
                <NavLink to="/restore-password" className="forget">
                  Forget Password
                </NavLink>
                <NavLink to="/register">Create an account</NavLink>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LoginPage;
