import React, { useState } from "react";

const Languages = ({ changeLanguage, languages }) => {
  const [active, setActive] = useState(3);
  return (
    <div className="languages">
      <ul>
        {languages.map((obj, i) => (
          <li
            key={i}
            className={i === active ? "active" : ""}
            onClick={() => {
              changeLanguage(obj.lang);
              setActive(i);
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
