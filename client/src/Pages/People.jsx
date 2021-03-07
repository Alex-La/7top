import { useEffect } from "react";
import "../css/people.css";

import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/mainActions";

import Account from "../Components/Account";

const People = () => {
  const [
    { allUsers, cursor, hasMore },
    usersPanding,
  ] = useSelector(({ users, usersPanding }) => [users, usersPanding]);
  const dispath = useDispatch();

  const loadMore = () => dispath(getUsers(cursor));

  return (
    <div className="people">
      <Account backBtn />
      <section>
        <div className="container">
          {allUsers.map((item, index) => (
            <div className="comp" key={index}>
              <div className="elipse_">
                <div className="elipse3_">
                  <img
                    src={item.avatar}
                    alt="avatar"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="text">
                <p className="p3">{item.name}</p>
                <p className="p4">Status</p>
              </div>
            </div>
          ))}

          {hasMore && (
            <button
              style={{ textAlign: "center", justifyContent: "center" }}
              className="btn"
              disabled={usersPanding}
              onClick={loadMore}
            >
              Load more
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default People;
