import { useEffect } from "react";
import styles from "../css/account.module.css";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/mainActions";

import Left from "../img/left.png";

const Account = ({ backBtn = false, showWallet = false }) => {
  const allUsersLength = useSelector(({ users }) => users.allUsersLength);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(allUsersLength);
  }, [allUsersLength]);

  useEffect(() => {
    if (!allUsersLength) dispatch(getUsers());
  }, [dispatch, allUsersLength]);

  return (
    <header className="header" id="header">
      <div className={styles.container + " container"}>
        <div className={styles.account}>
          {backBtn && (
            <NavLink to="/" className={styles.left}>
              <img src={Left} alt="left" />
            </NavLink>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.links}>
            {/* <NavLink to="/friends">1 My friends</NavLink> */}
            <NavLink to="/people">{allUsersLength} All</NavLink>
            {showWallet ? (
              <a>My wallet: {/*id*/}</a>
            ) : (
              <a
                href="https://t.me/joinchat/HSApdhx_OO301lltbkyfhw"
                className={styles.chat}
                target="_blank"
              >
                <i className="fa fa-telegram" aria-hidden="true"></i>
                <span>Telegram chat</span>
              </a>
            )}
            {/* {admin ? <NavLink to="/admin">Admin</NavLink> : ""} */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Account;
