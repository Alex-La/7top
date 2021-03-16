import { useEffect } from "react";
import "./App.css";

import { useDispatch } from "react-redux";
import { getMe } from "./redux/actions/mainActions";
import { setTronWeb } from "./redux/actions/tronWebActions";

import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    let tries = 0;
    const interval = setInterval(() => {
      if (window.tronWeb) {
        if (window.tronWeb.ready) dispatch(setTronWeb(window.tronWeb));
        else dispatch(setTronWeb(false));
        clearInterval(interval);
      } else tries++;
      if (tries >= 10) clearInterval(interval);
    }, 1000);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
