import { useEffect, useState } from "react";
import useMessage from "../../hooks/message.hook";
import useHttp from "../../hooks/http.hook";

const Month = () => {
  const message = useMessage();
  const { request } = useHttp();
  const [tronWeb, setTronWeb] = useState(null);
  const [Month5, setMonth5] = useState(null);

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

  useEffect(() => {
    if (Month5)
      (async () => {
        let sumCont = await Month5.getSumOnContract().call();
        sumCont = tronWeb.toDecimal(sumCont._hex);
        console.log(Math.floor(sumCont / 1e12));
        setSum(sumCont);
      })();
  }, [Month5]);

  useEffect(() => {
    if (tronWeb)
      (async () => {
        setMonth5(
          await tronWeb.contract().at("TVGniJKSx13v74zfwZL16pjvGUVf4xQynD")
        );
      })();
  }, [tronWeb]);

  useEffect(() => {
    let tries = 0;
    const inter = setInterval(() => {
      if (window.tronWeb) {
        clearInterval(inter);
        setTronWeb(window.tronWeb);
      } else tries++;

      if (tries === 10) clearInterval(inter);
    }, 1000);
  }, []);

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
          <button className="acc-btn acc-stop" style={{ float: "right" }}>
            Stop
          </button>
        </div>

        <div className="col s3">
          <button className="acc-btn acc-sell">Start</button>
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
