import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodoList from '../TodoList';
// import { Todo } from '../Todo';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={TodoList} />
            {/* <Route path="/todo" component="Todo" /> */}
          </Switch>
        </Router>
      </div>
    );
  };
}

export default App;