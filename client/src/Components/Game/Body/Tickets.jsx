import { Fragment } from "react";
import Ticket from "../../../img/ticket.png";

const Tickets = () => {
  const buyTicket = () => console.log("Buy ticket");

  return (
    <Fragment>
      <a onClick={buyTicket}>
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
