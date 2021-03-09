import { useEffect } from "react";
import styles from "../css/account.module.css";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/mainActions";

import Left from "../img/left.png";
import Place1 from "../img/place1.png";
import { ImageUpload } from "./Upload";

const Account = ({ backBtn = false, showWallet = false, winnerList }) => {
  const allUsersLength = useSelector(({ users }) => users.allUsersLength);
  const me = useSelector(({ me }) => me);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsersLength) dispatch(getUsers());
  }, [dispatch, allUsersLength]);

  const logoutHandler = () => localStorage.removeItem("token");

  return (
    <header className="header" id="header">
      <div className={styles.container + " container"}>
        <div className={styles.account}>
          {backBtn && (
            <NavLink to="/" className={styles.left}>
              <img src={Left} alt="left" />
            </NavLink>
          )}

          <div className={styles.profile}>
            {me && (
              <>
                {" "}
                <div className={styles.elipse}>
                  {
                    <ImageUpload
                      img={me.avatar}
                      id={me._id}
                      token={localStorage.getItem("token")}
                    />
                  }
                </div>
                <p className={styles.p1}>{me.name}</p>
              </>
            )}
          </div>

          {winnerList && (
            <NavLink to="/winners" className={styles.winnersBtn}>
              <img src={Place1} alt="star" />
              <span>Winners</span>
            </NavLink>
          )}

          {me && (
            <a href="/" onClick={logoutHandler} className={styles.logout}>
              <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
            </a>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.links}>
            {/* <NavLink to="/friends">1 My friends</NavLink> */}
            {me && <NavLink to="/friends">{1} My friends</NavLink>}
            <NavLink to="/people">{allUsersLength} All</NavLink>
            {showWallet && me ? (
              <a>
                My wallet:{" "}
                {me.wallet.substr(0, 6) + "..." + me.wallet.substr(30, 4)}
              </a>
            ) : (
              <>
                {!me && (
                  <>
                    {" "}
                    <NavLink to="/login">Вход</NavLink>
                    <NavLink to="/register">Регистрация</NavLink>
                  </>
                )}
                <a
                  href="https://t.me/joinchat/HSApdhx_OO301lltbkyfhw"
                  className={styles.chat}
                  target="_blank"
                >
                  <i className="fa fa-telegram" aria-hidden="true"></i>
                  <span>Telegram chat</span>
                </a>
              </>
            )}
            {/* {admin ? <NavLink to="/admin">Admin</NavLink> : ""} */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Account;
