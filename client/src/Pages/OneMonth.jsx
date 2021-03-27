import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../css/game.css";

import useHttp from "../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentContract } from "../redux/actions/tronActions";
import io from "socket.io-client";

import Banner from "../Components/Game/Banner";
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
  const language = useSelector(({ language }) => language);
  const tronWeb = useSelector(({ tronWeb }) => tronWeb);
  const [time, setTime] = useState(0);
  const [bannerCfg, setBannerCfg] = useState({
    showBanner: false,
    showButtons: true,
  });

  useEffect(() => {
    const socket = io();
    socket.on("sell", (data) => {
      console.log(data);
      if ("month5" in data)
        setBannerCfg({ showBanner: !data.month5, showButtons: data.month5 });
      if ("drawing" in data) {
        window.location.reload();
      }
    });

    return () => socket.off("sell");
  }, []);

  useEffect(() => {
    if (tronWeb.instance)
      (async () => {
        let sell = await tronWeb.instance.contract().at(tronWeb.Month5);
        sell = await sell.sellTickets().call();
        setBannerCfg({ showBanner: !sell, showButtons: sell });
      })();
  }, [tronWeb]);

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
      {bannerCfg.showBanner && (
        <Banner
          onClose={() => setBannerCfg((cfg) => ({ ...cfg, showBanner: false }))}
        />
      )}
      <Game
        title={language.result.page.allgames[6]}
        time={time}
        showButtons={bannerCfg.showButtons}
      >
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
