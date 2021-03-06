import "../css/allgames.css";

import { NavLink } from "react-router-dom";

import Chelovek from "../img/chelovek.png";
import Men2 from "../img/men2.png";
import Day2 from "../img/day2.png";
import Calendar3 from "../img/calendar3.png";
import Calendar2 from "../img/calendar2.png";
import Gavat from "../img/gavat.png";
import Banner from "../img/banner.jpg";

const AllGames = () => {
  return (
    <div className="allgames">
      <section className="section1" id="section1">
        <div className="container">
          <div className="component">
            <div className="comp1">
              <div className="title">
                <p className="p2">
                  <span>Max</span> 10
                </p>
                <img src={Chelovek} alt="chelovek" />
              </div>
              <NavLink to="/limitGame">
                <div className="btn">
                  <p className="p3">PLAY 1000$</p>
                </div>
              </NavLink>
              <div className="title2">
                <div className="top">
                  <img src={Men2} alt="men" />
                  <p className="p4">{20}</p>
                </div>
                <p className="p5">Human</p>
              </div>
            </div>
          </div>
          <div className="comp2">
            <div className="timer">{/* <WeekTimer /> */}</div>
            <div className="blok2">
              <div className="title3">
                <img src={Day2} alt="minute" />
                <p className="p6">Every week</p>
              </div>
              <NavLink to="/oneWeek">
                <div className="btn">
                  <p className="p3">PLAY 100$</p>
                </div>
              </NavLink>
            </div>
            <div className="title2">
              <div className="top">
                <img src={Men2} alt="men" />
                <p className="p4">{10}</p>
              </div>
              <p className="p5">Human</p>
            </div>
          </div>
          <div className="comp2">
            <div className="timer">{/* <MonthTimer /> */}</div>
            <div className="blok2">
              <div className="title3">
                <img src={Calendar3} alt="minute" />
                <p className="p6">Every 4 weeks</p>
              </div>
              <NavLink to="/oneMonth">
                <div className="btn">
                  <p className="p3">PLAY 100$</p>
                </div>
              </NavLink>
            </div>
            <div className="title2">
              <div className="top">
                <img src={Men2} alt="men" />
                <p className="p4">{10}</p>
              </div>
              <p className="p5">Human</p>
            </div>
          </div>
          <div className="comp2 comp3">
            <div className="blok2">
              <div className="title3 title_">
                <img src={Calendar2} alt="minute" />
                <p className="p6">Every year</p>
              </div>
              <div className="timer">{/* <YearTimer /> */}</div>
            </div>
            <div className="blok3">
              <div className="title3">
                <img src={Gavat} alt="gavat" />
                <p className="p6">Super game</p>
                <p className="p5 p5_">Human</p>
                <div className="top">
                  <img className="men_" src={Men2} alt="men" />
                  <p className="p4">{10}</p>
                </div>
              </div>
              <NavLink to="/oneYear">
                <div className="btn btn-2">
                  <p className="p3">PLAY 100$</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/hx0HORJcpV0?rel=0"
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="banner-wrapper">
            <a
              href="https://ychanger.net/?R=16100409488763"
              target="_blank"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <img src={Banner} alt="banner" style={{ maxWidth: 320 }} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllGames;
