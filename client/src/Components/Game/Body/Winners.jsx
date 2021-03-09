import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWinners } from "../../../redux/actions/tronActions";

import Win from "../../../img/win.png";
import Place1 from "../../../img/place1.png";
import Place2 from "../../../img/place2.png";

const Winners = () => {
  const dispatch = useDispatch();
  const { winners, contract } = useSelector(({ winners, contract }) => ({
    winners,
    contract,
  }));

  useEffect(() => {
    if (contract) dispatch(getWinners(contract));
  }, [contract, dispatch]);

  return (
    <Fragment>
      <div className="winners">
        <img src={Win} alt="winner" />
        <p className="p10">List of winners</p>
      </div>

      {winners.map((winner, index) => (
        <div key={index} className="winners_">
          <div className="avatar-win">
            <div className="elipse4">
              <img src={winner.user.avatar} style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div className="avatar-title">
            <p className="p11">{winner.user.name}</p>
            <div className="place">
              <img
                className="place1"
                src={index === 0 ? Place1 : Place2}
                alt="place1"
              />
              <p className="p12">
                {index + 1} Place <span>{winner.amount} $</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Winners;
