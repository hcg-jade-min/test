import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import * as Pages from "./pages";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLogin: true
  //   }
  // };
  render() {
    // const { isLogin } = this.state;

    // if (isLogin === null) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/users/login',
    //       }}
    //     />
    //   )
    // } else {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Pages.Objectives.List} />
            <Route exact path="/objectives" component={Pages.Objectives.List} />
            <Route path="/objectives/new" component={Pages.Objectives.New} />
            <Route exact path="/objectives/:objective_id" component={Pages.Objectives.Show} />
            <Route path="/objectives/:objective_id/edit" component={Pages.Objectives.Edit} />
            <Route path="/users/signup" component={Pages.Users.Signup} />
            <Route path="/users/login" component={Pages.Users.Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
    // }
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));