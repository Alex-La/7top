const Tickets = () => {
  const buyTicket = () => console.log("Buy ticket");

  return (
    <div className="tickets">
      <a onClick={buyTicket}>
        <div className="btn">BUY</div>
      </a>
    </div>
  );
};

export default Tickets;
