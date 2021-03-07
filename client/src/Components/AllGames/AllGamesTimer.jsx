import { Fragment } from "react";
import Timer from "react-compound-timer";

const AllGamesTimer = ({ initialTime }) => {
  return (
    <Timer initialTime={initialTime} direction="backward">
      {() => (
        <Fragment>
          <ul>
            <li style={{ color: "#979797" }}>
              {(<Timer />)._owner.stateNode.state.d - 1 >= 0
                ? (<Timer />)._owner.stateNode.state.d - 1
                : 0}
            </li>
            <hr />
            <li>
              <Timer.Days /> day
            </li>
            <hr />
            <li style={{ color: "#979797" }}>
              {(<Timer />)._owner.stateNode.state.d + 1}
            </li>
          </ul>
          <ul>
            <li style={{ color: "#979797" }}>
              {(<Timer />)._owner.stateNode.state.h - 1 >= 0
                ? (<Timer />)._owner.stateNode.state.h - 1
                : 24 + (<Timer />)._owner.stateNode.state.h - 1}
            </li>
            <hr />
            <li>
              <Timer.Hours /> hour
            </li>
            <hr />
            <li style={{ color: "#979797" }}>
              {(<Timer />)._owner.stateNode.state.h + 1 <= 23
                ? (<Timer />)._owner.stateNode.state.h + 1
                : Math.abs(60 - (<Timer />)._owner.stateNode.state.h - 1)}
            </li>
          </ul>
        </Fragment>
      )}
    </Timer>
  );
};

export default AllGamesTimer;
