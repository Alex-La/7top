import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../redux/actions/tronActions";

import Timer from "../../Components/Timer";
import Account from "../../Components/Account";

import Money from "../../img/money.png";
import Chelovek from "../../img/chelovek.png";

const Header = ({ title, time, children }) => {
  const dispatch = useDispatch();
  const { contract, balance } = useSelector(({ contract, balance }) => ({
    contract,
    balance,
  }));

  useEffect(() => {
    if (contract) dispatch(getBalance({ contract }));
  }, [dispatch, contract]);

  useEffect(() => {
    console.log(contract);
  }, [contract]);

  return (
    <section>
      <div className="container">
        <Account backBtn />
        <p className="p2"></p>
        {time && <Timer time={time} />}

        <div className="total">
          <p className="p3">Sum total</p>
          <div className="sum-total">
            <div className="total-info">
              <img src={Money} alt="money" />
              <p className="p4" id="lalla">
                <span>{balance} $</span>
                Bank
              </p>
            </div>
          </div>
        </div>

        <div className="slider-title">
          <img src={Chelovek} alt="chelovek" />
          <p className="p5">{title}</p>
        </div>

        {children}
      </div>
    </section>
  );
};

export default Header;
