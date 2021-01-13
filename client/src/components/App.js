import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Landing from "./Landing";
import * as actions from "../actions"; // sprema sve action creators u jedan objekt actions

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />

            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/surveys" component={Dashboard}></Route>
            <Route path="/surveys/new" component={SurveyNew}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

//prvi argument connecta je mapStateToProps funkcija koja ovdje nije potrebna, drugi su action creators
// pojaviti ce se kao props
export default connect(null, actions)(App);
