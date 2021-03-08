import { useCallback, useState } from "react";
import Men2 from "../../img/men2.png";

const Body = () => {
  const [bottom, setBottom] = useState(false);

  const handleScroll = useCallback((e) =>
    setBottom(
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50
    )
  );

  return (
    <section className="section" id="section2">
      <div className="container">
        <div className="section22">
          <div className="participants">
            <div className="title">
              <img src={Men2} alt="men" />
              <p>
                Total participants
                <span>3</span>
              </p>
            </div>

            <div className="accounts" onScroll={handleScroll}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
