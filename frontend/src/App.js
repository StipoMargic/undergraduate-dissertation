import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
// eslint-disable-next-line import/no-named-as-default
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
