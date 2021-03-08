import { Fragment } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body/Participants";
import Tickets from "./Body/Tickets";

const Game = ({ title, time = false, children }) => {
  return (
    <Fragment>
      <Header time={time} title={title}>
        {children}
      </Header>
      <section className="section" id="section2">
        <div className="container">
          <div className="section22">
            <Body />
            <Tickets />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Game;
