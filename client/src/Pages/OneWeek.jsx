import { useEffect } from "react";
import Slider from "react-slick";
import "../css/game.css";

import { useSelector, useDispatch } from "react-redux";
import { getAllgames } from "../redux/actions/mainActions";
import { setCurrentContract } from "../redux/actions/tronActions";

import Preloader from "../Components/Preloader";
import Game from "../Components/Game/Game";

const OneWeek = () => {
  useEffect(() => {
    document.title =
      "Еженедельная лотерея с гарантированным розыгрышем джекпота (Собирается в криптовалюте Tron)!";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "С пятницы на субботу проводится розыгрыш банка, выплаты выигрыша происходят автоматически. Прозрачное определение победителя, простая проверка выигрышного билета."
      );
  }, []);

  const allgames = useSelector(({ allgames }) => allgames);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentContract({ contract: "Everyweek5" }));
    return () => dispatch(setCurrentContract({ contract: null }));
  }, [dispatch]);

  useEffect(() => {
    if (!allgames) dispatch(getAllgames());
  }, [allgames, dispatch]);

  const arrayOfSlides = [{ value: "5 $" }, { value: "50 $" }];
  const setting = {
    centerMode: true,
    slidesToShow: 1,
    dots: false,
    autoplay: false,
    beforeChange: (_, newId) => {
      dispatch(setCurrentContract({ contract: setCurrentSlide(newId) }));
    },
  };

  if (!allgames) return <Preloader />;

  return (
    <div className="row game">
      <Game title="Every 10 people" time={allgames[7].weekTime}>
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
      return "Everyweek5";
    case 1:
      return "Everyweek50";
    default:
      return "Everyweek5";
  }
};

export default OneWeek;
