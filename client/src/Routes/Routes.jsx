import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Preloader from "../Components/Preloader";

const AllGames = lazy(() => import("../Pages/AllGames"));
const AuthPage = lazy(() => import("../Pages/AuthPage"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const People = lazy(() => import("../Pages/People"));
const LimitGame = lazy(() => import("../Pages/LimitGame"));
const OneWeek = lazy(() => import("../Pages/OneWeek"));
const OneMonth = lazy(() => import("../Pages/OneMonth"));
const OneYear = lazy(() => import("../Pages/OneYear"));

const Routes = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Switch>
        <Route exact path="/" component={AllGames} />
        <Route path="/register" component={AuthPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/people" component={People} />
        <Route path="/limitGame" component={LimitGame} />
        <Route path="/oneWeek" component={OneWeek} />
        <Route path="/oneMonth" component={OneMonth} />
        <Route path="/oneYear" component={OneYear} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
