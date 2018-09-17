import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {
  //In future versions the componentWillMount-method will be called multiple times by convention
  //The difference in time is essential none anyway
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
  return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            {/* exact means that the path shouldbe exacty the same as the path and not only contain the "/" */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions) (App);