import { useEffect } from "react";
import "../css/game.css";

import { useSelector, useDispatch } from "react-redux";
import { getAllgames } from "../redux/actions/mainActions";

import Preloader from "../Components/Preloader";

import Game from "../Components/Game/Game";

const OneYear = () => {
  useEffect(() => {
    document.title =
      "Лотерея с большим джекпотом, который выиграет один из участников гарантированно!";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Сделайте ставку в 5 долларов! Участвуй, количество билетов не ограничено. Джекпот может изменить твою жизнь! Испытай удачу. Выиграй!"
      );
  }, []);

  const main = useSelector(({ main }) => main);
  const dispatch = useDispatch();

  useEffect(() => {
    if (main.length === 0) dispatch(getAllgames());
  }, [main, dispatch]);

  if (main.length === 0) return <Preloader />;

  return (
    <div className="row game">
      <Game title="Every year" time={main[7].yearTime} />
    </div>
  );
};

export default OneYear;
