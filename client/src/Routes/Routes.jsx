import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Preloader from "../Components/Preloader";

const AllGames = lazy(() => import("../Pages/AllGames"));

const Routes = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Switch>
        <Route exact path="/" component={AllGames} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
