import { useCallback, useEffect, useState } from "react";
import useMessage from "../../hooks/message.hook";
import useHttp from "../../hooks/http.hook";

import { useSelector } from "react-redux";

const Month = () => {
  const message = useMessage();
  const { request } = useHttp();
  const tronWeb = useSelector(({ tronWeb }) => tronWeb);

  const [winnersTickets, setWinnersTickets] = useState([null, null]);
  const [sum, setSum] = useState(0);
  const [sellTicks, setSellTicks] = useState(false);
  const [ticksCount, setTicksCount] = useState(0);
  const [form, setForm] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });

  const sellOrStopSellTickets = useCallback(async () => {
    try {
      const Month5 = await tronWeb.instance.contract().at(tronWeb.Month5);
      await Month5.sellOrStopSellTickets().send();
      await new Promise((reslove) => setTimeout(reslove, 1000));
      const sell = await sellTickets();
      await request("/api/tron/sell", "POST", { month5: sell });
    } catch (e) {
      console.log(e);
    }
  }, [tronWeb]);

  const sellTickets = useCallback(async () => {
    if (!tronWeb.instance) return;
    const Month5 = await tronWeb.instance.contract().at(tronWeb.Month5);
    const sell = await Month5.sellTickets().call();
    setSellTicks(sell);
    return sell;
  }, [tronWeb]);

  useEffect(() => {
    if (tronWeb.instance)
      (async () => {
        const Month5 = await tronWeb.instance.contract().at(tronWeb.Month5);

        let tick = await Month5.countOfTicket().call();
        tick = tronWeb.instance.toDecimal(tick._hex);
        setTicksCount(tick);

        let sumCont = await Month5.getSumOnContract().call();
        sumCont = tronWeb.instance.toDecimal(sumCont._hex);
        setSum(Math.floor(sumCont / 1e12));

        sellTickets();
      })();
  }, [tronWeb, sellTickets]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="row">
        <div className="col s4">
          <p className="p2">{sum} $</p>
        </div>
        <div className="col s4">
          <p className="p2">
            Month{" "}
            <span style={{ color: sellTicks ? "greenyellow" : "red" }}>
              ({sellTicks ? "true" : "false"})
            </span>
          </p>
        </div>
        <div className="col s4">
          <p className="p2">{ticksCount} Tickets</p>
        </div>
      </div>

      <div className="row">
        <div className="col s2">
          <input
            onChange={handleChange}
            value={form.one}
            name="one"
            className="acc-input"
            type="text"
            maxLength={2}
          />
        </div>
        <div className="col s2">
          <input
            onChange={handleChange}
            value={form.two}
            name="two"
            className="acc-input"
            type="text"
            maxLength={2}
          />
        </div>
        <div className="col s2">
          <input
            onChange={handleChange}
            value={form.three}
            name="three"
            className="acc-input"
            type="text"
            maxLength={2}
          />
        </div>
        <div className="col s2">
          <input
            onChange={handleChange}
            value={form.four}
            name="four"
            className="acc-input"
            type="text"
            maxLength={2}
          />
        </div>
        <div className="col s2">
          <input
            onChange={handleChange}
            value={form.five}
            name="five"
            className="acc-input"
            type="text"
            maxLength={2}
          />
        </div>
        <div className="col s2">
          <input
            onChange={handleChange}
            value={form.six}
            name="six"
            className="acc-input"
            type="text"
            maxLength={2}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s3">
          <button className="acc-btn acc-darwing" style={{ float: "right" }}>
            DRAWING
          </button>
        </div>
        <div className="col s3">
          <button className="acc-btn acc-send">Send</button>
        </div>
        <div className="col s3">
          <button
            onClick={sellOrStopSellTickets}
            className="acc-btn acc-stop"
            style={{ float: "right" }}
          >
            Stop
          </button>
        </div>

        <div className="col s3">
          <button onClick={sellOrStopSellTickets} className="acc-btn acc-sell">
            Start
          </button>
        </div>
      </div>
      <div
        className="row"
        style={{
          textAlign: "center",
        }}
      >
        <div className="col s12">
          {winnersTickets[0] !== null && (
            <p className="acc-p">1. WINNER # {winnersTickets[0]}</p>
          )}
          {winnersTickets[1] !== null && (
            <p className="acc-p">1. WINNER # {winnersTickets[1]}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Month;
