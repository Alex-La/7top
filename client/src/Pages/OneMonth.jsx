import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../css/game.css";

import useHttp from "../hooks/http.hook";
import { useDispatch } from "react-redux";
import { setCurrentContract } from "../redux/actions/tronActions";

import Game from "../Components/Game/Game";

const OneMonth = () => {
  useEffect(() => {
    document.title =
      "Лотерея с тиражом каждые четыре недели, существенный джекпот от 7top.org";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Сорви крупный банк, тираж лотереи по номеру билета. Лучшая лотерея в мире с 2021г. Скачай крипто кошелек Tronlink, ведь выигрыш поступит сразу к тебе на кошелек, вывода ждать не нужно."
      );
  }, []);

  const { request } = useHttp();
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);

  useEffect(() => {
    dispatch(setCurrentContract({ contract: "Month5" }));
    return () => dispatch(setCurrentContract({ contract: null }));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const data = await request("/api/main/time/monthTime");
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

export default OneMonth;
