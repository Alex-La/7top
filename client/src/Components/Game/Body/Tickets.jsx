import { Fragment, useCallback, useEffect, useState } from "react";
import Ticket from "../../../img/ticket.png";

import { useSelector, useDispatch } from "react-redux";
import { getBalance, buyAction } from "../../../redux/actions/tronActions";

import useTronWeb from "../../../hooks/tronweb.hook";
import useMessage from "../../../hooks/message.hook";

import Ticketimg from "../../../img/Ticketimg.png";

const games = {
  LimitLottery5: "TRGCoM8ForcJhHXCE3RsWouF14V3rPixSu",
  LimitLottery15: "TArRpQXzAutbdn3rZfPmMQzHx2rn4uRGy5",
  LimitLottery50: "TSmijEjGX7F2MY9nUJbaiB1xqgVbN7bYvX",
  Everyweek5: "TYk1bmKpaASD8MHLXr6QipNYdtUAAHno4f",
  Everyweek50: "TKF9zmQpKHPgA9FxuSVHpogiucTGVRHBWN",
  Month5: "TVGniJKSx13v74zfwZL16pjvGUVf4xQynD",
  EveryYear5: "TBcYVCEM5Y2dXVGg7ojTyN6pHeuWnRThBf",
};

const Tickets = () => {
  const message = useMessage();
  const { buyTicket, error, clearError } = useTronWeb();
  const dispatch = useDispatch();
  const [myTickets, setMyTickets] = useState([]);
  const { contract, me } = useSelector(({ contract, me }) => ({
    contract,
    me,
  }));

  const getMyTickets = useCallback(async () => {
    if (window.tronWeb && window.tronWeb.ready && me) {
      const lottery = await window.tronWeb.contract().at(games[contract]);
      const ticks = await lottery.getMyTickets(me.wallet).call();
      const arrayOfTicks = [];
      for (let i in ticks) {
        arrayOfTicks.push(window.tronWeb.toDecimal(ticks[i]._hex));
      }
      setMyTickets(arrayOfTicks);
    }
  }, [me, contract]);

  useEffect(() => {
    let tries = 0;
    const inter = setInterval(() => {
      if (window.tronWeb) {
        clearInterval(inter);
        getMyTickets();
      } else tries++;

      if (tries === 10) clearInterval(inter);
    }, 1000);
  }, [getMyTickets]);

  useEffect(() => {
    if (error === "Success!") {
      dispatch(buyAction({ me }));
      dispatch(getBalance({ contract }));
    }
    message(error);
    clearError();
  }, [error, clearError, message, dispatch, getMyTickets, me, contract]);

  const buy = () => buyTicket(games[contract]);

  return (
    <Fragment>
      <a onClick={buy}>
        <div className="btn">BUY</div>
      </a>

      <div className="ticket-title">
        <img src={Ticket} alt="ticket" />
        <p className="p7">
          My tickets <span style={{ color: "#3897f1" }}>{" " + 4}</span>
        </p>
      </div>

      <div className="tickets_">
        {myTickets.map((item, index) => (
          <div key={index}>
            <p className="p8">№ {item}</p>
            <p className="p9">
              <img src={Ticketimg} alt="ticketimg" width={60} height={60} />{" "}
            </p>
          </div>
        ))}
      </div>
      <hr />
    </Fragment>
  );
};

export default Tickets;
