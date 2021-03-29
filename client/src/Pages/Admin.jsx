import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Account from "../Components/Account";
import Week5 from "../Components/Admin/Week5";

import "../css/game.css";
import "../css/account.css";

const Admin = () => {
  const [winNumber, setWinNumber] = useState();
  const { instance, SevenTOP } = useSelector(({ tronWeb }) => tronWeb);

  const getWinNumber = useCallback(async () => {
    if (instance) {
      const sevenTOP = await instance.contract().at(SevenTOP);
      let number = await sevenTOP.winNumberOne().call();
      number = instance.toDecimal(number._hex);
      setWinNumber(number);
    }
  }, [instance, SevenTOP]);

  useEffect(() => {
    getWinNumber();
  }, [getWinNumber]);

  return (
    <div className="row game">
      <section>
        <Account backBtn showWallet />
      </section>
      <p className="p2">{winNumber}</p>
      <section>
        <div className="container">
          <div className="acc-wrap">
            <Week5 getWinNumber={getWinNumber} />
            {/*<WeekFivteen /> */}
          </div>
        </div>
      </section>
      <br />
      <section>
        <div className="container">
          <div className="acc-wrap">{/* <Month /> */}</div>
        </div>
      </section>
      <br />
      <section>
        <div className="container">
          <div className="acc-wrap">{/* <Year /> */}</div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
