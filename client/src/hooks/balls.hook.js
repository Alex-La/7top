import { useCallback, useState } from "react";

import useHttp from "./http.hook";

const useBalls = () => {
  const { request } = useHttp();
  const [balls, setBalls] = useState([]);

  const getBalls = useCallback(
    async (contract) => {
      let name = "null";

      switch (contract) {
        case "Everyweek5":
          name = "week5";
          break;
        case "Everyweek50":
          name = "week50";
          break;
        case "Month5":
          name = "month5";
          break;
        case "EveryYear5":
          name = "year5";
          break;
        default:
          name = "null";
      }

      const balls = await request(`/api/tron/balls/${name}`, "GET");
      setBalls(balls);
    },
    [request]
  );

  const ReturnBalls = useCallback(
    ({ place, time }) => {
      if (
        balls &&
        balls.length !== 0 &&
        Math.abs(balls[balls.length - 1].time - time * 1000) <= 5000
      ) {
        return (
          <div style={{ textAlign: "center", color: "orange" }}>
            {place === 0
              ? balls[balls.length - 1].value.map((b) => `(${b})`)
              : balls[balls.length - 1].value
                  .slice()
                  .reverse()
                  .map((b) => `(${b.reverse_string()})`)}{" "}
            mod {balls[balls.length - 1].players} ={" "}
            {place === 0
              ? balls[balls.length - 1].value.join("") %
                balls[balls.length - 1].players
              : balls[balls.length - 1].value
                  .slice()
                  .reverse()
                  .map((b) => b.reverse_string())
                  .join("") % balls[balls.length - 1].players}
          </div>
        );
      } else return "";
    },
    [balls]
  );

  return { getBalls, ReturnBalls };
};

export default useBalls;
