import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/http.hook";

import "../css/game.css";
import "../css/account.css";

import Account from "../Components/Account";

import Month from "../Components/Admin/Month";

const Admin = () => {
  const history = useHistory();
  const me = useSelector(({ me }) => me);
  const [tronWeb, setTronWeb] = useState(null);
  const { request } = useHttp();
  const [winNumber, setWinNumber] = useState();

  const [admin, isAdmin] = useState(true);

  useEffect(() => {
    if (tronWeb)
      (async () => {
        let data = await tronWeb
          .contract()
          .at("TQUWfMQmhuGGqYXfa3LNWXKAtoc1RZcgMV");
        data = await data.winNumberOne().call();
        data = tronWeb.toDecimal(data._hex);
        setWinNumber(data);
      })();
  }, [tronWeb]);

  useEffect(() => {
    let tries = 0;
    const inter = setInterval(() => {
      if (window.tronWeb) {
        clearInterval(inter);
        setTronWeb(window.tronWeb);
      } else tries++;

      if (tries === 10) clearInterval(inter);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!admin) history.push("/");
  }, [admin]);

  useEffect(() => {
    if (me)
      (async () => {
        try {
          const result = await request(
            "/api/auth/admin",
            "POST",
            { userId: me._id },
            {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          );
          isAdmin(result.admin);
        } catch (e) {
          isAdmin(false);
        }
      })();
    else isAdmin(false);
  }, [me]);

  return (
    <div className="row game">
      <section>
        <Account backBtn showWallet />
      </section>
      <p className="p2">{winNumber}</p>
      <section>
        <div className="container">
          <div className="acc-wrap">
            <Month />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
