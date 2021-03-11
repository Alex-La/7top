import { useEffect } from "react";
import "../css/allWinners.css";
import "../css/people.css";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllWinners,
  loadMoreAllWinners,
} from "../redux/actions/mainActions";

import Account from "../Components/Account";
import Preloader from "../Components/Preloader";

import Place1 from "../img/place1.png";
import Place2 from "../img/place2.png";

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

  const dispatch = useDispatch();
  const { allWinners, cursor, hasMore, loading, success, total } = useSelector(
    ({ allWinners }) => allWinners
  );

  useEffect(() => {
    if (!total) dispatch(getAllWinners());
  }, [total, getAllWinners]);

  const loadMore = () => dispatch(loadMoreAllWinners(cursor));

  const ReturnDate = ({ time }) => {
    const date = new Date(time * 1000);
    return (
      <span style={{ fontSize: 15, color: "grey" }}>
        {date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear()}
      </span>
    );
  };

  if (!total) return <Preloader />;

  return (
    <div className="people all-winners">
      <Account backBtn={true} />
      {success ? (
        <section>
          <div className="container">
            {allWinners.map((winner, index) => (
              <div className="comp" key={index}>
                <div className="elipse_">
                  <div className="elipse3_">
                    <img src={winner.user.avatar} alt="winner" />
                  </div>
                </div>
                <div className="text">
                  <p className="p3">
                    {winner.user.name} <ReturnDate time={winner.timestapmt} />
                  </p>
                  <div className="place">
                    <img
                      src={
                        winner.event_name === "FirstWinner" ? Place1 : Place2
                      }
                      alt="star"
                    />
                    <span>
                      {winner.event_name === "FirstWinner" ? "First" : "Second"}{" "}
                      Place <span className="sum">{winner.amount} $</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {hasMore && (
              <button
                disabled={loading}
                style={{ textAlign: "center", justifyContent: "center" }}
                className="btn"
                onClick={loadMore}
              >
                Load more
              </button>
            )}
          </div>
        </section>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default Winners;
