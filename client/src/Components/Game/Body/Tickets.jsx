import Ticket from "../../../img/ticket.png";

const Tickets = () => {
  const buyTicket = () => console.log("Buy ticket");

  return (
    <div className="tickets">
      <a onClick={buyTicket}>
        <div className="btn">BUY</div>
      </a>

      <div className="ticket-title">
        <img src={Ticket} alt="ticket" />
        <p className="p7">
          My tickets <span style={{ color: "#3897f1" }}>{" " + 4}</span>
        </p>
      </div>

      <div className="tickets_"></div>
    </div>
  );
};

export default Tickets;
