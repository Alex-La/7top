import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../css/game.css";

import useHttp from "../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentContract } from "../redux/actions/tronActions";
import io from "socket.io-client";

import Banner from "../Components/Game/Banner";
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
      if ("year5" in data)
        setBannerCfg({ showBanner: !data.year5, showButtons: data.year5 });
      if ("drawing" in data) {
        window.location.reload();
      }
    });

    return () => socket.off("sell");
  }, []);

  useEffect(() => {
    if (tronWeb.instance)
      (async () => {
        let sell = await tronWeb.instance.contract().at(tronWeb.EveryYear5);
        sell = await sell.sellTickets().call();
        setBannerCfg({ showBanner: !sell, showButtons: sell });
      })();
  }, [tronWeb]);

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
      {bannerCfg.showBanner && (
        <Banner
          onClose={() => setBannerCfg((cfg) => ({ ...cfg, showBanner: false }))}
        />
      )}
      <Game
        title="Every 10 people"
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

export default OneYear;
