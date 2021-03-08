import { Fragment } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

const Game = ({ title, time = false }) => {
  return (
    <Fragment>
      <Header time={time} title={title} />
      <Body />
      <Footer />
    </Fragment>
  );
};

export default Game;
