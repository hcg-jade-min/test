import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import * as Pages from "./pages";

class App extends React.Component {
  // state = {
  //   isLogin: false
  // }
  render() {
    // const { isLogin } = this.state;
    // console.log("isLogin", isLogin)
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Pages.Objectives.List} />
            <Route exact path="/objectives" component={Pages.Objectives.List} />
            <Route path="/objectives/new" component={Pages.Objectives.New} />
            <Route exact path="/objectives/:objective_id" component={Pages.Objectives.Show} />
            <Route exact path="/objectives/:objective_id/key_results" component={Pages.Objectives.KrNew} />
            <Route path="/objectives/:objective_id/key_results/:key_result_id" component={Pages.Objectives.KrEdit} />
            <Route path="/objectives/:objective_id/edit" component={Pages.Objectives.Edit} />
            <Route path="/users/signup" component={Pages.Users.Signup} />
            <Route path="/users/login" component={Pages.Users.Login} />
            {/* <Route exact path="/objectives" render={() => {
              if (isLogin) {
                return <Redirect to="/objectives" />;
              }
              return <Redirect to="/users/login" />;
            }}
            /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));