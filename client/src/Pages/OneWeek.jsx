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

  const main = useSelector(({ main }) => main);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentContract({ contract: "Everyweek5" }));
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
      <Game title="Every week" time={main[7].monthTime}>
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

export default OneWeek;
