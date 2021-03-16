import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../hooks/http.hook";

import "../css/game.css";
import "../css/account.css";

import Account from "../Components/Account";

import Month from "../Components/Admin/Month";

const Admin = () => {
  const me = useSelector(({ me }) => me);
  const tronWeb = useSelector(({ tronWeb }) => tronWeb);
  const { request } = useHttp();
  const [winNumber, setWinNumber] = useState();

  const [admin, isAdmin] = useState(true);

  useEffect(() => {
    if (tronWeb.instance)
      (async () => {
        let data = await tronWeb.instance.contract().at(tronWeb.SevenTOP);
        data = await data.winNumberOne().call();
        data = tronWeb.instance.toDecimal(data._hex);
        setWinNumber(data);
      })();
  }, [tronWeb]);

  useEffect(() => {
    if (!admin) window.location.replace("/");
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
    <>
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
      {!tronWeb && (
        <span
          style={{ position: "absolute", color: "red", bottom: 5, right: 5 }}
        >
          Check TronLink!
        </span>
      )}
    </>
  );
};

export default Admin;
