import { Fragment } from "react";

import useTronWeb from "../../../hooks/tronweb.hook";

import Ticket from "../../../img/ticket.png";
import Ticketimg from "../../../img/Ticketimg.png";

const Tickets = ({ showButtons }) => {
  const { buyTicket, myTickets } = useTronWeb();

  return (
    <Fragment>
      {showButtons && (
        <a onClick={buyTicket}>
          <div className="btn">BUY</div>
        </a>
      )}

      <div className="ticket-title">
        <img src={Ticket} alt="ticket" />
        <p className="p7">
          My tickets{" "}
          <span style={{ color: "#3897f1" }}>{" " + myTickets.length}</span>
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
