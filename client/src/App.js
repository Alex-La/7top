import { useEffect } from "react";
import "./App.css";

import { useDispatch } from "react-redux";
import { getMe } from "./redux/actions/mainActions";

import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
