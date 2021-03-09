import { useEffect, useState } from "react";
import "../css/register.css";

import { NavLink, useHistory } from "react-router-dom";

import Img1 from "../img/img1.png";
import Logo from "../img/logo.png";

const AuthPage = () => {
  useEffect(() => {
    document.title =
      "Зарегистрируйся на сайте 7top.org для участия в лотереи. Выиграть джекпот может каждый";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Для регистрации потребуется ввести логин, электронную почту, пароль,  и адрес крипто кошелька Tron который вы сможете получить, скачав приложение Tronlink, а также логин или кошелек друга, если он Вас пригласил."
      );
  }, []);

  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    wallet: "",
    friendId: "",
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="register">
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
                <i className="fa fa-user icon1"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Email"
                  name="email"
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

              <div className="input-container">
                <i className="fa fa-key icon1"></i>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  name="macthPassword"
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <i className="fa fa-user icon1"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="My wallet"
                  name="wallet"
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <i className="fa fa-user icon1"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Friend ID or wallet"
                  name="friendId"
                  onChange={changeHandler}
                />
              </div>

              <button
                type="submit"
                className="btn"
                //   onClick={registerHandler}
                //   disabled={loading}
              >
                Sign in
              </button>
              <div className="links">
                <NavLink to="/restore-password" className="forget">
                  Forget Password
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AuthPage;
