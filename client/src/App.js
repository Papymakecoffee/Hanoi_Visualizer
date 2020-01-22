import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Hanoi } from "./components/Hanoi.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/">
                <Hanoi/>
            </Route>
            <Route exact path="/about">
                <h1>Salut</h1>
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;