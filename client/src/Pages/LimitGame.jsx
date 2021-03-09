import { useEffect } from "react";
import Slider from "react-slick";
import "../css/game.css";

import { useDispatch } from "react-redux";
import { setCurrentContract } from "../redux/actions/tronActions";

import Preloader from "../Components/Preloader";
import Game from "../Components/Game/Game";

const LimitGame = () => {
  useEffect(() => {
    document.title =
      "Лотерея 1 из 10 – игра с ограниченным количеством участников. Победит 1 игрок";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Сделайте ставку в 5 долларов, десятая ставка проведет розыгрыш, определив рандомно 1победителя, им сможете стать Вы. Испытай удачу!"
      );
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentContract({ contract: "LimitLottery5" }));
    return () => dispatch(setCurrentContract({ contract: null }));
  }, [dispatch]);

  const arrayOfSlides = [
    { value: "5 $" },
    { value: "15 $" },
    { value: "50 $" },
  ];
  const setting = {
    centerMode: true,
    slidesToShow: 1,
    dots: false,
    autoplay: false,
    beforeChange: (_, newId) => {
      dispatch(setCurrentContract({ contract: setCurrentSlide(newId) }));
    },
  };

  return (
    <div className="row game">
      <Game title="Every 10 people">
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

const setCurrentSlide = (id) => {
  switch (id) {
    case 0:
      return "LimitLottery5";
    case 1:
      return "LimitLottery15";
    case 2:
      return "LimitLottery50";
    default:
      return "LimitLottery5";
  }
};

export default LimitGame;