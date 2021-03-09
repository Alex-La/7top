import { useEffect } from "react";
import "../css/allWinners.css";

import Account from "../Components/Account";

const Winners = () => {
  useEffect(() => {
    document.title = "Список победителей крипто лотереи 7top.org";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Проверить реальность выплат не составит труда, ведь все они записаны в блокчен сети Tron. Поздравьте победителей в нашем телеграмм чате https://t.me/joinchat/UQfr0fTQF3OukpS8"
      );
  }, []);

  return (
    <div className="people all-winners">
      <Account backBtn={true} />
      <section>
        <div className="container"></div>
      </section>
    </div>
  );
};

export default Winners;
