import { useEffect } from "react";
import Slider from "react-slick";
import "../css/game.css";

import { useSelector, useDispatch } from "react-redux";
import { getAllgames } from "../redux/actions/mainActions";
import { setCurrentContract } from "../redux/actions/tronActions";

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
    dispatch(setCurrentContract({ contract: "EveryYear5" }));
  }, [dispatch]);

  useEffect(() => {
    if (main.length === 0) dispatch(getAllgames());
  }, [main, dispatch]);

  const arrayOfSlides = [{ value: "5 $" }];
  const setting = {
    centerMode: true,
    slidesToShow: 1,
    dots: false,
    autoplay: false,
    beforeChange: (_, newInd) => {
      //setCurrentSlide(newInd);
    },
  };

  if (main.length === 0) return <Preloader />;

  return (
    <div className="row game">
      <Game title="Every year" time={main[7].yearTime}>
        <Slider {...setting}>
          {arrayOfSlides.map((item, index) => (
            <div className="item" key={index}>
              <p>{item.value}</p>
            </div>
          ))}
        </Slider>
      </Game>
    </div>
  );
};

export default OneYear;
