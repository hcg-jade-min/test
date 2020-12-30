import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from "react-router-dom";

import * as Pages from "./pages";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/objectives" component={Pages.Objectives.List} />
            <Route path="/objectives/new" component={Pages.Objectives.New} />
            <Route path="/objectives/edit" component={Pages.Objectives.New} />
            <Route path="/objectives/:objective_id" component={Pages.Objectives.Show} />
            <Route path="/users" component={Pages.Users.Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));
/////
