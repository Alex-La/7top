import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwners, loadMoreOwners } from "../../../redux/actions/tronActions";

import Men2 from "../../../img/men2.png";

const Body = () => {
  const dispatch = useDispatch();
  const { total, cursor, hasMore, owners } = useSelector(
    ({ owners }) => owners
  );

  useEffect(() => {
    dispatch(getOwners({ contract: "EveryYear5" }));
  }, [dispatch]);

  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    if (hasMore && bottom)
      dispatch(loadMoreOwners({ contract: "EveryYear5", after: cursor }));
  }, [bottom, hasMore, dispatch]);

  const handleScroll = useCallback((e) =>
    setBottom(
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50
    )
  );

  return (
    <div className="participants">
      <div className="title">
        <img src={Men2} alt="men" />
        <p>
          Total participants
          <span>{total}</span>
        </p>
      </div>

      <div className="accounts" onScroll={handleScroll}>
        {owners.map((item, index) => (
          <div key={index}>
            <p className="p6">{index}</p>
            <div className="avatar">
              <div className="elipse2">
                <img
                  src={item.avatar}
                  style={{ objectFit: "cover" }}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="name">
              <p className="name">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;