import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../css/game.css";

import useHttp from "../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
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

  const { request } = useHttp();
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);

  useEffect(() => {
    dispatch(setCurrentContract({ contract: "EveryYear5" }));
    return () => dispatch(setCurrentContract({ contract: null }));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const data = await request("/api/main/time/yearTime");
      setTime(data.time);
    })();
  }, [request]);

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

  return (
    <div className="row game">
      <Game title="Every 10 people" time={time}>
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
