import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../redux/actions/tronActions";

import Slider from "react-slick";

import Timer from "../../Components/Timer";
import Account from "../../Components/Account";

import Money from "../../img/money.png";
import Chelovek from "../../img/chelovek.png";

const Header = ({ title, time }) => {
  const dispatch = useDispatch();
  const balance = useSelector(({ balance }) => balance);

  useEffect(() => {
    dispatch(getBalance({ contract: "EveryYear5" }));
  }, [dispatch]);

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
    <section>
      <div className="container">
        <Account backBtn />
        <p className="p2"></p>
        {time && <Timer time={time} />}

        <div className="total">
          <p className="p3">Sum total</p>
          <div className="sum-total">
            <div className="total-info">
              <img src={Money} alt="money" />
              <p className="p4" id="lalla">
                <span>{balance} $</span>
                Bank
              </p>
            </div>
          </div>
        </div>

        <div className="slider-title">
          <img src={Chelovek} alt="chelovek" />
          <p className="p5">{title}</p>
        </div>

        <Slider {...setting}>
          {arrayOfSlides.map((item, index) => (
            <div className="item" key={index}>
              <p>{item.value}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Header;
