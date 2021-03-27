import { useRef, useEffect, useState } from "react";
import M from "materialize-css";
import "../css/langDropdown.css";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../redux/actions/mainActions";

import Us from "../img/united-states.png";
import Ge from "../img/germany.png";
import Ru from "../img/russia.png";
import Sp from "../img/spain.png";
import Ch from "../img/china.png";

const arr = [
  { name: "english", src: Us },
  { name: "german", src: Ge },
  { name: "russian", src: Ru },
  { name: "spanish", src: Sp },
  { name: "chinese", src: Ch },
];

const LangDropdown = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [country, setCountry] = useState(
    localStorage.getItem("lang")
      ? JSON.parse(localStorage.getItem("lang"))
      : { name: "English", src: Us }
  );

  useEffect(() => {
    if (dropdownRef.current)
      M.Dropdown.init(dropdownRef.current, { coverTrigger: false });
  }, [dropdownRef]);

  useEffect(() => {
    dispatch(changeLanguage(country.name));
  }, [country, dispatch]);

  const changeLang = (i) => {
    setCountry(arr[i]);
    localStorage.setItem("lang", JSON.stringify(arr[i]));
  };

  return (
    <div
      className="input-field"
      style={{ position: "fixed", zIndex: 1, right: 10 }}
    >
      <img
        ref={dropdownRef}
        src={country.src}
        alt="us"
        width={40}
        height={40}
        className="dropdown-trigger"
        data-target="lang"
      />
      <ul
        id="lang"
        className="dropdown-content lang-dropdown"
        style={{ backgroundColor: "transparent", overflowX: "hidden" }}
      >
        {arr.map((c, i) => (
          <li
            onClick={() => changeLang(i)}
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            <img
              src={c.src}
              width={40}
              height={40}
              style={{ marginRight: 5 }}
            />
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LangDropdown;
