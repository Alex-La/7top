import { Fragment, useEffect } from "react";
import Ticket from "../../../img/ticket.png";

import { useSelector, useDispatch } from "react-redux";
import { getBalance } from "../../../redux/actions/tronActions";

import useTronWeb from "../../../hooks/tronweb.hook";
import useMessage from "../../../hooks/message.hook";

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
  const { contract, me } = useSelector(({ contract, me }) => ({
    contract,
    me,
  }));

  useEffect(() => {
    if (error === "Success!") {
      dispatch({ type: "BUY", payload: { avatar: me.avatar, name: me.name } });
      dispatch(getBalance({ contract }));
    }
    message(error);
    clearError();
  }, [error, clearError, message]);

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
        {/* {myTickets
                  ? myTickets.map((item, index) => (
                      <div key={index}>
                        <p className="p8">№ {item - 1}</p>
                        <p className="p9">
                          <img
                            src={Ticketimg}
                            alt="ticketimg"
                            width={60}
                            height={60}
                          />{" "}
                        </p>
                      </div>
                    ))
                  : ""} */}
      </div>
      <hr />
    </Fragment>
  );
};

export default Tickets;
