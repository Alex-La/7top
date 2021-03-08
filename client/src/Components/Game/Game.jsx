import { Fragment } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body/Participants";

const Game = ({ title, time = false }) => {
  return (
    <Fragment>
      <Header time={time} title={title} />
      <section className="section" id="section2">
        <div className="container">
          <div className="section22">
            <Body />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Game;
